
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'eslint:recommended',
        'prettier',
        'plugin:testing-library/dom',
        'plugin:testing-library/react',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    resolve: {
        alias: {
            "@": "./src"
        }
    },
    plugins: ["@typescript-eslint",
        "eslint-plugin-import"
    ],
    rules: {
        'arrow-body-style': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
        'comma-dangle': ['off', 'never'],
        'no-console': 'off',
        'no-duplicate-imports': 'warn',
        'no-unused-vars': 'warn',
        'import/order': [
            'warn',
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc',
                },
                groups: [
                    'builtin',
                    'external',
                    'index',
                    'sibling',
                    'parent',
                    'internal',
                ],
            },
        ],
        'jsx-quotes': ['warn', 'prefer-double'],
        'object-curly-spacing': ['warn', 'always'],
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'default-param-last': 'off',
        radix: 'off',
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "no-param-reassign": "off",
    },
    settings: {
        "import/resolver": {
            "alias": {
                map: [["@", "./src"]]
            }
        }
    },
};