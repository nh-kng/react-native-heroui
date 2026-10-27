const { defineConfig } = require('eslint/config');
const universe = require('eslint-config-universe/flat/native');
const universeWeb = require('eslint-config-universe/flat/web');

module.exports = defineConfig([{ ignores: ['build'] }, ...universe, ...universeWeb, {
  files: ['src/primitives/**/*.{ts,tsx}'],
  rules: {
    'react-hooks/preserve-manual-memoization': 'off',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/refs': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
  },
}]);
