module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    indent: 'off',
    'operator-linebreak': 'off',
    'new-cap': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 'off'
  }
};
