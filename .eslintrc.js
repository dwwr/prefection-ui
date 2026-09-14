module.exports = {
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-curly-newline': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-indent': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
  },
  extends: ['plugin:storybook/recommended'],
}
