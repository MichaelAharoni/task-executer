const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      semi: 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-alert': 'error',
      'no-debugger': 'error',
      'no-constant-condition': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-extra-parens': 'error',
      'no-extra-label': 'error',
      'no-extra-bind': 'error',
      'no-spaced-func': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error', // Suggests enforcing return types on functions
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Suggests enforcing explicit types on exported functions' and classes' parameters and return types
      '@typescript-eslint/no-explicit-any': 'off', // Allows the use of `any` type (you can change this to "error" to disallow `any`)
      'object-property-newline': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'return', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
    },
  },
];
