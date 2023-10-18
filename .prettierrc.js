/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  bracketSameLine: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'auto',
  printWidth: 100,
  importOrder: ['mocks', '^react(-native)?(/.*)?$', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
