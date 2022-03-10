module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-unused-components': 'off',
    'spaced-comment': 'off',
    'no-console': 'off',
    eqeqeq: 'off',
  },
}
