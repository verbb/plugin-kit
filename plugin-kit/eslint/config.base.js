import js from '@eslint/js';
import globals from 'globals';

export default [
    // Global ignores
    {
        ignores: [
            '**/dist/**',
            '**/node_modules/**',
            '**/*.min.js',
            '**/*.bundle.js',
            '**/*.config.js',
            '**/*.config.ts',
        ],
    },

    // Base JavaScript configuration
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
    },

    // Global rules used by every config, not specific to any language
    {
        rules: {
            // Inherit recommended rules
            ...js.configs.recommended.rules,

            //
            // Best Practices
            //

            // enforces return statements in callbacks of array's methods
            'array-callback-return': ['warn', { allowImplicit: true }],

            // specify curly brace conventions for all control statements
            curly: ['warn', 'all'],

            // encourages use of dot notation whenever possible
            'dot-notation': ['warn', { allowKeywords: true }],

            // enforces consistent newlines before or after dots
            'dot-location': ['warn', 'property'],

            // disallow the use of alert, confirm, and prompt
            'no-alert': 'off',

            // disallow else after a return in an if
            'no-else-return': ['warn', { allowElseIf: false }],

            // disallow empty functions, except for standalone funcs/arrows
            'no-empty-function': ['warn', {
                allow: [
                    'arrowFunctions',
                    'functions',
                    'methods',
                ],
            }],

            // disallow use of eval()
            'no-eval': 'warn',

            // disallow the use of leading or trailing decimal points in numeric literals
            'no-floating-decimal': 'warn',

            // disallow use of multiple spaces
            'no-multi-spaces': ['warn', {
                ignoreEOLComments: false,
            }],

            // disallow use of multiline strings
            'no-multi-str': 'warn',

            // disallow useless string concatenation
            'no-useless-concat': 'warn',

            // disallow redundant return; keywords
            'no-useless-return': 'warn',

            // disallow unnecessary escape characters
            'no-useless-escape': 'off',

            // require or disallow Yoda conditions
            yoda: 'warn',

            //
            // ES6
            //

            // require braces in arrow function body
            'arrow-body-style': ['warn', 'always'],

            // disallow arrow functions where they could be confused with comparisons
            'no-confusing-arrow': ['warn', {
                allowParens: true,
            }],

            // require let or const instead of var
            'no-var': 'warn',

            // require method and property shorthand syntax for object literals
            'object-shorthand': ['warn', 'always', {
                ignoreConstructors: false,
                avoidQuotes: true,
            }],

            // suggest using arrow functions as callbacks
            'prefer-arrow-callback': ['warn', {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            }],

            // suggest using of const declaration for variables that are never modified after declared
            'prefer-const': ['warn', {
                destructuring: 'any',
                ignoreReadBeforeAssign: true,
            }],

            // Prefer destructuring from arrays and objects
            'prefer-destructuring': ['warn', {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: true,
                    object: false,
                },
            }, {
                    enforceForRenamedProperties: false,
                }],

            // suggest using template literals instead of string concatenation
            'prefer-template': 'warn',

            // import sorting
            'sort-imports': ['off', {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true,
            }],

            //
            // Style
            //

            // require camel case names
            camelcase: ['warn', { properties: 'always', ignoreDestructuring: true }],

            // enforce or disallow capitalization of the first letter of a comment
            'capitalized-comments': ['warn', 'always', {
                line: {
                    ignorePattern: '.*',
                    ignoreInlineComments: true,
                    ignoreConsecutiveComments: true,
                },
                block: {
                    ignorePattern: '.*',
                    ignoreInlineComments: true,
                    ignoreConsecutiveComments: true,
                },
            }],

            // require or disallow an empty line between class members
            'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: false }],

            // require or disallow newlines around directives
            'lines-around-directive': ['warn', {
                before: 'always',
                after: 'always',
            }],

            // disallow if as the only statement in an else block
            'no-lonely-if': 'warn',

            // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning
            'no-multiple-empty-lines': ['warn', { max: 2, maxBOF: 0, maxEOF: 0 }],

            // disallow nested ternary expressions
            'no-nested-ternary': 'warn',

            // Prefer use of an object spread over Object.assign
            'prefer-object-spread': 'warn',

            // require or disallow a space immediately following the // or /* in a comment
            'spaced-comment': ['warn', 'always', {
                line: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
                },
                block: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
                    balanced: true,
                }
            }],

            //
            // Variables
            //

            // disallow use of undeclared variables unless mentioned in a /*global */ block
            'no-undef': 'off',

            // disallow declaration of variables that are not used in the code
            'no-unused-vars': 'off',

            // disallow use of variables before they are defined
            'no-use-before-define': ['warn', { functions: true, classes: true, variables: true }],
        },
    }
]
