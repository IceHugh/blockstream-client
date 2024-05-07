// import tsParser from '@typescript-eslint/parser';
const tsParser = require('@typescript-eslint/parser');
module.exports = {
  files: ['src/**/*.{ts,tsx,js}'],
  ignores: ['dist', 'test'],
  languageOptions: {
    parser: tsParser,
  },
  rules: {},
};
