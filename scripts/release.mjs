#!/usr/bin/env node
/**
 * Release Plugin Kit v2 packages in lockstep.
 *
 * CHANGELOG.md is the source of truth. While developing, add entries under
 * `## Unreleased` in whichever package changelog(s) actually changed. The
 * release is gated on at least one package having Unreleased entries; every
 * empty sibling changelog gets a lockstep “released alongside” note.
 *
 * Usage (from plugin-kit-repo/):
 *   npm run release:patch
 *   npm run release:minor
 *   npm run release:major
 *   npm run release:patch -- --dry-run
 *   node ./scripts/release.mjs --publish-current [--dry-run]
 *     → publish the versions already on disk (no bump / changelog rewrite / commit).
 *       Use for the first 2.0.0 cut after versions were aligned manually.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const publishCurrent = args.includes('--publish-current');
const bump = args.find((arg) => arg !== '--dry-run' && arg !== '--publish-current') ?? 'patch';
const validBumps = new Set(['patch', 'minor', 'major']);

/** Publish order: leaves first, then web, then framework adapters. */
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

/** Canonical version source for the lockstep bump (was plugin-kit in v1). */
const versionSourceDir = 'plugin-kit-web';

const paths = {
    versionSourcePackageJson: new URL(`../${versionSourceDir}/package.json`, import.meta.url),
};

const packageJsonPaths = packageDirs.map((dir) => `${dir}/package.json`);
const changelogPaths = packageDirs.map((dir) => `${dir}/CHANGELOG.md`);

const rollbackPaths = [
    ...packageJsonPaths,
    ...changelogPaths,
    'package-lock.json',
];

if (!publishCurrent && !validBumps.has(bump)) {
    console.error('Usage: npm run release -- <patch|minor|major> [--dry-run]');
    console.error('       node ./scripts/release.mjs --publish-current [--dry-run]');
    process.exit(1);
}

const run = (command, commandArgs, options = {}) => {
    execFileSync(command, commandArgs, {
        stdio: 'inherit',
        ...options,
    });
};

const output = (command, commandArgs) => execFileSync(command, commandArgs, {
    encoding: 'utf8',
}).trim();

const tryOutput = (command, commandArgs) => {
    try {
        return output(command, commandArgs);
    } catch {
        return null;
    }
};

const ensureCleanWorkingTree = () => {
    const status = output('git', ['status', '--porcelain']);

    if (status) {
        console.error('Release aborted: commit or stash current changes first.');
        console.error(status);
        process.exit(1);
    }
};

const verifyNpmAuth = () => {
    const user = tryOutput('npm', ['whoami']);

    if (!user) {
        throw new Error(
            'Not logged in to npm. Run `npm login` in this terminal, or add a publish token to ~/.npmrc.',
        );
    }

    console.log(`npm publish identity: ${user}`);

    for (const packageName of packages) {
        const access = tryOutput('npm', ['access', 'get', 'status', packageName]);

        if (!access) {
            throw new Error(
                `Cannot verify publish access for ${packageName}. `
                + 'Ensure your npm user or token can publish to the @verbb scope '
                + '(first-time packages still need scope publish permission).',
            );
        }
    }
};

const packageVersion = () => JSON.parse(readFileSync(paths.versionSourcePackageJson, 'utf8')).version;

/** Abort if any publishable package.json drifted off the lockstep version. */
const assertLockstepVersions = () => {
    const expected = packageVersion();
    const mismatches = [];

    for (const relativePath of packageJsonPaths) {
        const pkg = JSON.parse(readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8'));

        if (pkg.version !== expected) {
            mismatches.push(`${pkg.name}@${pkg.version} (expected ${expected})`);
        }
    }

    if (mismatches.length > 0) {
        throw new Error(
            `Lockstep broken — all publishable packages must share one version (${expected}):\n`
            + mismatches.map((line) => `  - ${line}`).join('\n'),
        );
    }
};

const releaseDate = () => new Date().toISOString().slice(0, 10);

const changelogUrl = (dir) => new URL(`../${dir}/CHANGELOG.md`, import.meta.url);

const readChangelog = (fileUrl) => readFileSync(fileUrl, 'utf8').replace(/\r\n/g, '\n');

const writeChangelog = (fileUrl, content) => {
    writeFileSync(fileUrl, `${content.replace(/\n+$/, '')}\n`, 'utf8');
};

const extractUnreleasedBody = (content) => {
    const match = content.match(/^## Unreleased\n([\s\S]*?)(?=^## )/m);

    return match ? match[1] : null;
};

const hasMeaningfulChangelogBody = (body) => {
    if (!body?.trim()) {
        return false;
    }

    return body.split('\n').some((line) => {
        const trimmed = line.trim();

        return /^(-|\*|\d+\.)\s+\S/.test(trimmed) || /^###\s+\S/.test(trimmed);
    });
};

const lockstepBody = () => (
    '### Changed\n'
    + '- Released alongside the other `@verbb/plugin-kit-*` packages to keep versions aligned.\n'
);

const finalizeChangelogContent = (content, version, date, { requireContent = true, label = 'CHANGELOG.md' } = {}) => {
    const normalized = content.replace(/\r\n/g, '\n');

    if (!normalized.startsWith('# Changelog\n')) {
        throw new Error(`${label} must start with "# Changelog"`);
    }

    const unreleasedBody = extractUnreleasedBody(normalized);
    let releaseBody = unreleasedBody?.trim() ?? '';

    if (!hasMeaningfulChangelogBody(releaseBody)) {
        if (requireContent) {
            throw new Error(`${label} must have change entries under \`## Unreleased\``);
        }

        releaseBody = lockstepBody().trim();
    }

    const previousSections = normalized
        .replace(/^# Changelog\n\n/, '')
        .replace(/^## Unreleased\n[\s\S]*?(?=^## )/m, '')
        .trimStart();

    return `# Changelog\n\n## Unreleased\n\n## ${version} - ${date}\n\n${releaseBody}\n\n${previousSections}`.trimEnd();
};

const rollbackReleaseChanges = () => {
    try {
        execFileSync('git', ['checkout', '--', ...rollbackPaths], {
            stdio: 'inherit',
        });
        console.error('Release failed. Restored package versions and changelogs.');
    } catch {
        console.error('Release failed and automatic rollback did not work.');
        console.error(`Run: git checkout -- ${rollbackPaths.join(' ')}`);
    }
};

/** Keep caret/range prefix when syncing internal @verbb deps to the new lockstep version. */
const syncDepVersion = (current, version) => {
    if (current === '*' || current === 'workspace:*') {
        return current;
    }

    if (current.startsWith('^')) {
        return `^${version}`;
    }

    if (current.startsWith('~')) {
        return `~${version}`;
    }

    return version;
};

const syncInternalDependencies = (version) => {
    for (const relativePath of packageJsonPaths) {
        const fileUrl = new URL(`../${relativePath}`, import.meta.url);
        const pkg = JSON.parse(readFileSync(fileUrl, 'utf8'));
        let changed = false;

        for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
            const deps = pkg[depType];

            if (!deps) {
                continue;
            }

            for (const packageName of packages) {
                if (deps[packageName]) {
                    const next = syncDepVersion(deps[packageName], version);

                    if (deps[packageName] !== next) {
                        deps[packageName] = next;
                        changed = true;
                    }
                }
            }
        }

        if (changed) {
            writeFileSync(fileUrl, `${JSON.stringify(pkg, null, 4)}\n`, 'utf8');
        }
    }
};

const buildPackages = () => {
    // Ordered lib build from the workspace root (core → icons → … → web → react → vue).
    run('npm', ['run', 'build:libs']);
};

const packDryRunAll = () => {
    for (const packageName of packages) {
        run('npm', ['pack', '--dry-run', '-w', packageName]);
    }
};

const publishPackages = () => {
    for (const packageName of packages) {
        try {
            run('npm', ['publish', '-w', packageName, '--access', 'public']);
        } catch (error) {
            throw new Error(
                `npm publish failed for ${packageName}.\n`
                + 'If you see E404, npm auth is usually the cause even when install works.\n'
                + 'Run `npm login` in this terminal, or refresh your publish token in ~/.npmrc.\n'
                + 'Granular tokens need Publish permission for the @verbb scope.',
                { cause: error },
            );
        }
    }
};

if (!dryRun) {
    ensureCleanWorkingTree();
} else {
    console.log('Dry run: skipping clean-tree check, version bump, changelog writes, publish, and commit.');
}

const changelogContents = Object.fromEntries(
    packageDirs.map((dir) => [dir, readChangelog(changelogUrl(dir))]),
);

// Gate on Unreleased entries in ANY package rather than one fixed changelog, so a
// change scoped to e.g. plugin-kit-core alone can still cut a lockstep release.
// Empty siblings pick up the "released alongside" note at finalize time.
if (!publishCurrent) {
    const dirsWithEntries = packageDirs.filter((dir) => (
        hasMeaningfulChangelogBody(extractUnreleasedBody(changelogContents[dir]))
    ));

    if (dirsWithEntries.length === 0) {
        console.error(
            'Release aborted: add entries under `## Unreleased` in at least one package '
            + `CHANGELOG.md first (checked: ${packageDirs.join(', ')}).`,
        );
        process.exit(1);
    }

    console.log(`Unreleased changelog entries found in: ${dirsWithEntries.join(', ')}`);
}

try {
    assertLockstepVersions();
} catch (error) {
    console.error(error.message ?? error);
    process.exit(1);
}

if (publishCurrent) {
    console.log(`Publish-current mode: shipping on-disk versions (${packageVersion()}) without bumping.`);
} else {
    console.log('Changelog check passed. Running pre-release build…');
}

try {
    buildPackages();
    packDryRunAll();
} catch (error) {
    console.error('Pre-release build failed. Fix build errors before releasing.');
    console.error(error.message ?? error);
    process.exit(1);
}

if (dryRun) {
    console.log('Dry run complete. Re-run without --dry-run to publish.');
    process.exit(0);
}

verifyNpmAuth();

if (publishCurrent) {
    const version = packageVersion();

    try {
        publishPackages();
    } catch (error) {
        console.error(error.message ?? error);
        process.exit(1);
    }

    console.log(`Published Plugin Kit ${version} to npm (no version bump / commit).`);
    console.log('Commit the aligned 2.0.0 tree yourself if it is not already committed, then push.');
    process.exit(0);
}

const currentVersion = packageVersion();
let releaseStarted = false;

try {
    for (const packageName of packages) {
        run('npm', ['version', bump, '-w', packageName, '--no-git-tag-version']);
    }

    const version = packageVersion();

    if (version === currentVersion) {
        throw new Error(`Version did not change after ${bump} bump (still ${currentVersion}).`);
    }

    assertLockstepVersions();
    syncInternalDependencies(version);
    run('npm', ['install', '--ignore-scripts']);

    releaseStarted = true;

    const date = releaseDate();

    for (const dir of packageDirs) {
        writeChangelog(
            changelogUrl(dir),
            finalizeChangelogContent(changelogContents[dir], version, date, {
                // The any-package gate above guarantees at least one changelog has
                // real entries; each empty one falls back to the lockstep note.
                requireContent: false,
                label: `${dir}/CHANGELOG.md`,
            }),
        );
    }

    publishPackages();

    run('git', [
        'add',
        'package-lock.json',
        ...packageJsonPaths,
        ...changelogPaths,
    ]);
    run('git', ['commit', '-m', `Release ${version}`]);

    try {
        execFileSync('npm', ['run', 'deploy', '--', 'plugin-kit'], {
            cwd: new URL('../../../verbb-docs', import.meta.url),
            stdio: 'inherit',
        });
    } catch {
        console.warn('Docs deploy skipped (verbb-docs workspace not available).');
    }

    console.log(`Released Plugin Kit ${version} to npm.`);
    console.log('Push the release commit with:');
    console.log('  git push');
} catch (error) {
    if (releaseStarted) {
        rollbackReleaseChanges();
    }

    console.error(error.message ?? error);
    process.exit(1);
}
