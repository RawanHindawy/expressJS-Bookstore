import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
      },
    },
    rules: {
      'no-undef': 'error',
      'no-mixed-spaces-and-tabs': 'warn',
      'keyword-spacing': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-duplicate-imports': 'error',
      'prettier/prettier': 'error',
    },
  },
  js.configs.recommended,
];
