import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { dataTableLabels } from '../src/components/data-table/labels.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../translations/plugin-kit.json');

// Every component label set whose defaults go through `translatePluginKit()`. Add a set here when another
// component starts translating its built-in strings, so hosts can vendor the complete list.
const labelSets: Record<string, Record<string, string>> = {
    dataTable: dataTableLabels,
};

/**
 * Builds the English source strings that PHP hosts vendor as their `plugin-kit` translation file. Messages keep
 * their source order, which groups each component's strings together for translators, and repeats are dropped
 * because one translation covers every use of a string.
 */
export function buildTranslations(): string {
    const messages = [...new Set(Object.values(labelSets).flatMap((labels) => Object.values(labels)))];

    return `${JSON.stringify({ category: 'plugin-kit', sourceLanguage: 'en-US', messages }, null, 4)}\n`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
    const contents = buildTranslations();

    // `--check` lets CI and other packages confirm the published file matches the source without rewriting it.
    if (process.argv.includes('--check')) {
        const current = await fs.readFile(outputPath, 'utf8').catch(() => '');

        if (current !== contents) {
            console.error(`${path.relative(process.cwd(), outputPath)} is out of date. Run \`npm run gen:translations\`.`);
            process.exit(1);
        }

        console.log(`${path.relative(process.cwd(), outputPath)} is up to date.`);
    } else {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, contents, 'utf8');
        console.log(`Generated ${outputPath}`);
    }
}
