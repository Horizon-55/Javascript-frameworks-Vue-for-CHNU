const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allRules: js.configs.all,
});

module.exports = [
    {
        ignores: ['dist', 'node_modules', 'libs', '*.config.js'],
    },
    ...compat
        .config({
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint', 'prettier'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
            env: { browser: true, es2021: true, node: true },
            rules: {
                'prettier/prettier': 'error',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts'],
        })),
];
