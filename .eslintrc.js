module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [

  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
     // 关闭所有规则
    "no-unused-vars": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
