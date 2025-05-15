import js from '@eslint/js'
import * as tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-empty': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            'no-useless-escape': 'off',
            'no-useless-catch': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
        },
    },
    {
        ignores: ['dist/', 'node_modules/', 'build/']
    },
]
