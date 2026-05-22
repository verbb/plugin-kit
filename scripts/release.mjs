#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const bump = process.argv[2] ?? 'patch';
const validBumps = new Set(['patch', 'minor', 'major']);
const packages = ['@verbb/plugin-kit', '@verbb/plugin-kit-react'];

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

const ensureCleanWorkingTree = () => {
    const status = output('git', ['status', '--porcelain']);

    if (status) {
        console.error('Release aborted: commit or stash current changes first.');
        console.error(status);
        process.exit(1);
    }
};

const packageVersion = () => JSON.parse(readFileSync(new URL('../plugin-kit/package.json', import.meta.url), 'utf8')).version;

ensureCleanWorkingTree();

for (const packageName of packages) {
    run('npm', ['version', bump, '-w', packageName, '--no-git-tag-version']);
}

run('npm', ['install', '--package-lock-only', '--ignore-scripts']);

const version = packageVersion();

run('npm', ['run', 'build', '-w', '@verbb/plugin-kit']);
run('npm', ['run', 'build', '-w', '@verbb/plugin-kit-react']);
run('npm', ['pack', '--dry-run', '-w', '@verbb/plugin-kit']);
run('npm', ['pack', '--dry-run', '-w', '@verbb/plugin-kit-react']);

for (const packageName of packages) {
    run('npm', ['publish', '-w', packageName, '--access', 'public']);
}

run('git', ['add', 'package-lock.json', 'plugin-kit/package.json', 'plugin-kit-react/package.json']);
run('git', ['commit', '-m', `version ${version}`]);
run('git', ['tag', `${version}`]);

run('npm', ['run', 'deploy', '--', 'plugin-kit'], {
    cwd: new URL('../../../verbb-docs', import.meta.url),
});

console.log(`Released Plugin Kit ${version}. Push with:`);
console.log('  git push origin main');
console.log(`  git push origin ${version}`);
