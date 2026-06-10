#!/usr/bin/env node
/**
 * Release @verbb/plugin-kit and @verbb/plugin-kit-react in lockstep.
 *
 * CHANGELOG.md is the source of truth. While developing, add entries under
 * `## Unreleased` in plugin-kit-react/CHANGELOG.md (and plugin-kit/CHANGELOG.md
 * when there are package-specific changes).
 *
 * Usage (from plugin-kit-repo/):
 *   npm run release:patch
 *   npm run release:minor
 *   npm run release:major
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const bump = process.argv[2] ?? 'patch';
const validBumps = new Set(['patch', 'minor', 'major']);
const packages = ['@verbb/plugin-kit', '@verbb/plugin-kit-react'];

const paths = {
    pluginKitChangelog: new URL('../plugin-kit/CHANGELOG.md', import.meta.url),
    pluginKitReactChangelog: new URL('../plugin-kit-react/CHANGELOG.md', import.meta.url),
    pluginKitPackageJson: new URL('../plugin-kit/package.json', import.meta.url),
};

const rollbackPaths = [
    'plugin-kit/package.json',
    'plugin-kit-react/package.json',
    'plugin-kit/CHANGELOG.md',
    'plugin-kit-react/CHANGELOG.md',
    'package-lock.json',
];

if (!validBumps.has(bump)) {
    console.error('Usage: npm run release -- <patch|minor|major>');
    process.exit(1);
}

const run = (command, args, options = {}) => {
    execFileSync(command, args, {
        stdio: 'inherit',
        ...options,
    });
};

const output = (command, args) => execFileSync(command, args, {
    encoding: 'utf8',
}).trim();

const tryOutput = (command, args) => {
    try {
        return output(command, args);
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
                + 'Ensure your npm user or token can publish to the @verbb scope.',
            );
        }
    }
};

const packageVersion = () => JSON.parse(readFileSync(paths.pluginKitPackageJson, 'utf8')).version;

const releaseDate = () => new Date().toISOString().slice(0, 10);

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

const lockstepPluginKitBody = () => (
    '### Changed\n'
    + '- Released alongside `@verbb/plugin-kit-react` to keep package versions aligned.\n'
);

const finalizeChangelogContent = (content, version, date, { requireContent = true } = {}) => {
    const normalized = content.replace(/\r\n/g, '\n');

    if (!normalized.startsWith('# Changelog\n')) {
        throw new Error('CHANGELOG must start with "# Changelog"');
    }

    const unreleasedBody = extractUnreleasedBody(normalized);
    let releaseBody = unreleasedBody?.trim() ?? '';

    if (!hasMeaningfulChangelogBody(releaseBody)) {
        if (requireContent) {
            throw new Error('plugin-kit-react/CHANGELOG.md must have change entries under `## Unreleased`');
        }

        releaseBody = lockstepPluginKitBody().trim();
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

ensureCleanWorkingTree();
verifyNpmAuth();

const pluginKitReactChangelog = readChangelog(paths.pluginKitReactChangelog);
const pluginKitChangelog = readChangelog(paths.pluginKitChangelog);

if (!hasMeaningfulChangelogBody(extractUnreleasedBody(pluginKitReactChangelog))) {
    console.error('Release aborted: add entries under `## Unreleased` in plugin-kit-react/CHANGELOG.md first.');
    process.exit(1);
}

const currentVersion = packageVersion();
let releaseStarted = false;

try {
    for (const packageName of packages) {
        run('npm', ['version', bump, '-w', packageName, '--no-git-tag-version']);
    }

    run('npm', ['install', '--package-lock-only', '--ignore-scripts']);

    const version = packageVersion();

    if (version === currentVersion) {
        throw new Error(`Version did not change after ${bump} bump (still ${currentVersion}).`);
    }

    releaseStarted = true;

    writeChangelog(
        paths.pluginKitReactChangelog,
        finalizeChangelogContent(pluginKitReactChangelog, version, releaseDate(), { requireContent: true }),
    );
    writeChangelog(
        paths.pluginKitChangelog,
        finalizeChangelogContent(pluginKitChangelog, version, releaseDate(), { requireContent: false }),
    );

    run('npm', ['run', 'build', '-w', '@verbb/plugin-kit']);
    run('npm', ['run', 'build', '-w', '@verbb/plugin-kit-react']);
    run('npm', ['pack', '--dry-run', '-w', '@verbb/plugin-kit']);
    run('npm', ['pack', '--dry-run', '-w', '@verbb/plugin-kit-react']);

    publishPackages();

    run('git', [
        'add',
        'package-lock.json',
        'plugin-kit/package.json',
        'plugin-kit-react/package.json',
        'plugin-kit/CHANGELOG.md',
        'plugin-kit-react/CHANGELOG.md',
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
    console.log('  git push origin main');
} catch (error) {
    if (releaseStarted) {
        rollbackReleaseChanges();
    }

    console.error(error.message ?? error);
    process.exit(1);
}
