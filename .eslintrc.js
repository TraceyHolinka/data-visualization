module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/recommended'],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/no-v-html': 'off',
    semi: 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any'
        }
      }
    ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
