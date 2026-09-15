#!/usr/bin/env node
/** Publish only a reviewed GitHub Actions checkout; never bump or commit here. */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';

/** Keep CI's public publish order alongside the code it executes. */
const packageDirs = [
    'plugin-kit-core',
    'plugin-kit-icons',
    'plugin-kit-codemirror-core',
    'plugin-kit-tiptap-core',
    'plugin-kit-forms',
    'plugin-kit-web',
    'plugin-kit-react',
    'plugin-kit-vue',
];

const packages = packageDirs.map((dir) => `@verbb/${dir}`);

const expectedSha = process.env.RELEASE_SHA;
const expectedVersion = process.env.RELEASE_VERSION;
const tarballDir = process.env.PACKAGE_TARBALL_DIR;

if (process.env.GITHUB_ACTIONS !== 'true' || process.env.GITHUB_REF !== 'refs/heads/main') {
    throw new Error('Prepared publication is restricted to the main-branch GitHub Actions workflow.');
}

if (!/^[0-9a-f]{40}$/.test(expectedSha ?? '') || !/^\d+\.\d+\.\d+$/.test(expectedVersion ?? '')) {
    throw new Error('RELEASE_SHA must be a full Git commit SHA and RELEASE_VERSION must be an exact version.');
}

if (!tarballDir || !isAbsolute(tarballDir)) {
    throw new Error('PACKAGE_TARBALL_DIR must be the absolute path to validated tarballs.');
}

// Capture expected registry 404s for classification rather than printing them as CI failures.
const output = (command, args) => execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const head = output('git', ['rev-parse', 'HEAD']);

if (head !== expectedSha) {
    throw new Error(`Checkout is ${head}, not the reviewed release commit ${expectedSha}.`);
}

const status = output('git', ['status', '--porcelain']);

if (status) {
    throw new Error(`Build changed repository files; publication stopped before npm writes:\n${status}`);
}

const tarballs = new Map();

for (const dir of packageDirs) {
    const pkg = JSON.parse(readFileSync(new URL(`../${dir}/package.json`, import.meta.url), 'utf8'));
    const changelog = readFileSync(new URL(`../${dir}/CHANGELOG.md`, import.meta.url), 'utf8');
    const tarball = join(tarballDir, `verbb-${dir}-${expectedVersion}.tgz`);

    if (pkg.version !== expectedVersion || pkg.name !== `@verbb/${dir}`) {
        throw new Error(`${dir} is not the expected lockstep package/version ${expectedVersion}.`);
    }

    if (pkg.repository?.url !== 'git+https://github.com/verbb/plugin-kit.git') {
        throw new Error(`${dir} repository.url does not match verbb/plugin-kit.`);
    }

    if (!changelog.includes(`## ${expectedVersion} - `)) {
        throw new Error(`${dir} has no finalized ${expectedVersion} changelog entry.`);
    }

    if (!existsSync(tarball)) {
        throw new Error(`Validated tarball is missing: ${tarball}`);
    }

    // Validate the exact bytes handed from the build job before npm receives them.
    const packed = JSON.parse(execFileSync('tar', ['-xOf', tarball, 'package/package.json'], { encoding: 'utf8' }));

    if (packed.name !== pkg.name || packed.version !== pkg.version || packed.repository?.url !== pkg.repository.url) {
        throw new Error(`${tarball} metadata does not match the reviewed checkout.`);
    }

    tarballs.set(pkg.name, tarball);
}

const registry = 'https://registry.npmjs.org/';
const publishedVersion = (packageName) => {
    try {
        // A newly published version must bypass npm's fresh metadata cache on every check.
        return output('npm', ['view', `${packageName}@${expectedVersion}`, 'version', '--registry', registry, '--prefer-online']);
    } catch (error) {
        const diagnostic = `${error.stderr ?? ''}\n${error.stdout ?? ''}`;

        if (/E404|404 Not Found/.test(diagnostic)) {
            return null;
        }

        throw new Error(`Could not check ${packageName}@${expectedVersion} on npm; publication stopped.`, { cause: error });
    }
};

const latestAcceptedVersion = (packageName) => {
    // npm exposes dist-tags while a newly accepted version is still being scanned.
    const tags = output('npm', ['dist-tag', 'ls', packageName, '--registry', registry, '--prefer-online']);
    const latest = tags.match(/^latest:\s*(\S+)$/m)?.[1];

    if (!latest) {
        throw new Error(`Could not read the latest npm dist-tag for ${packageName}; publication stopped.`);
    }

    return latest;
};

const waitForAcceptedVersion = async (packageName) => {
    const deadline = Date.now() + 2 * 60_000;

    while (true) {
        const accepted = latestAcceptedVersion(packageName);

        if (accepted === expectedVersion) {
            return;
        }

        if (Date.now() >= deadline) {
            throw new Error(`${packageName}@${expectedVersion} was accepted by npm but its latest dist-tag did not update after two minutes. Check npm before retrying.`);
        }

        console.log(`${packageName}@${expectedVersion} is accepted but its dist-tag is still updating; checking again in 10 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 10_000));
    }
};

// A retry must skip both installable versions and versions accepted but still being scanned.
for (const packageName of packages) {
    const existing = publishedVersion(packageName);

    if (existing && existing !== expectedVersion) {
        throw new Error(`${packageName} registry returned unexpected version ${existing}.`);
    }

    if (existing === expectedVersion || latestAcceptedVersion(packageName) === expectedVersion) {
        console.log(`Already accepted by npm: ${packageName}@${expectedVersion}`);
        continue;
    }

    console.log(`Publishing ${packageName}@${expectedVersion} from ${head}...`);
    execFileSync('npm', ['publish', tarballs.get(packageName), '--access', 'public', '--ignore-scripts', '--registry', registry], {
        stdio: 'inherit',
    });

    await waitForAcceptedVersion(packageName);
}

console.log(`All eight Plugin Kit packages were accepted by npm at ${expectedVersion}. They may still be undergoing registry scanning before becoming installable.`);
