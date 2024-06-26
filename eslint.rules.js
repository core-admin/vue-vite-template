module.exports = {
  'no-debugger': 1,
  'accessor-pairs': [
    2,
    {
      setWithoutGet: true,
      getWithoutSet: false,
    },
  ],
  'arrow-parens': 0,
  'arrow-spacing': [
    2,
    {
      before: true,
      after: true,
    },
  ],
  'switch-colon-spacing': [
    2,
    {
      after: true,
      before: false,
    },
  ],
  'template-tag-spacing': [2, 'never'],
  'block-spacing': [2, 'always'],
  'brace-style': [
    2,
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],
  camelcase: [
    0,
    {
      properties: 'always',
    },
  ],
  'comma-spacing': [
    2,
    {
      before: false,
      after: true,
    },
  ],
  'for-direction': 2,
  'comma-style': [2, 'last'],
  'constructor-super': 2,
  curly: [2, 'multi-line', 'consistent'],
  'dot-location': [2, 'property'],
  'eol-last': 0,
  eqeqeq: [2, 'always', { null: 'ignore' }],
  // 'array-callback-return': 2,
  'generator-star-spacing': [
    2,
    {
      before: false,
      after: true,
    },
  ],
  'handle-callback-err': [2, '^(err|error)$'],
  // vue文件的缩进风格中 eslint中的这条规则与prettier存在冲突
  // indent: [
  //   2,
  //   2,
  //   {
  //     SwitchCase: 1,
  //     flatTernaryExpressions: true,
  //   },
  // ],
  'jsx-quotes': [2, 'prefer-double'],
  'key-spacing': [
    2,
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    },
  ],
  'keyword-spacing': [
    2,
    {
      before: true,
      after: true,
    },
  ],
  'new-cap': [
    2,
    {
      newIsCap: true,
      capIsNew: false,
    },
  ],
  'new-parens': 2,
  // 太严格了
  // 'no-confusing-arrow': [
  //   2,
  //   {
  //     allowParens: true,
  //   },
  // ],
  'no-array-constructor': 2,
  'no-caller': 2,
  'no-console': 'off',
  'no-class-assign': 2,
  'no-cond-assign': [2, 'except-parens'],
  'no-const-assign': 2,
  'no-control-regex': 0,
  'no-delete-var': 2,
  'no-dupe-args': 2,
  'no-dupe-class-members': 2,
  'no-dupe-keys': 2,
  'no-duplicate-case': 2,
  'no-empty-character-class': 2,
  'no-empty-pattern': 2,
  'no-eval': 2,
  'no-ex-assign': 2,
  'no-extend-native': 2,
  'no-eq-null': 0,
  'no-extra-bind': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-parens': [2, 'functions'],
  'no-fallthrough': 2,
  'no-floating-decimal': 2,
  'no-func-assign': 2,
  'no-implied-eval': 2,
  'no-inner-declarations': [2, 'both'],
  'no-invalid-regexp': 2,
  'no-irregular-whitespace': [
    2,
    {
      skipStrings: true,
      skipComments: false,
      skipRegExps: true,
      skipTemplates: true,
    },
  ],
  'no-iterator': 2,
  'no-label-var': 2,
  'no-labels': 2,
  'no-lone-blocks': 2,
  'no-mixed-spaces-and-tabs': 2,
  'no-inline-comments': 0,
  'no-bitwise': 0,
  'no-continue': 0,
  'no-mixed-operators': 0,
  'max-nested-callbacks': [2, 3],
  'max-depth': [2, 5],
  // 自己写可以避免参数过的 但是第三方可能会存在参数过的方法
  'max-params': [1, 7],
  'no-multi-spaces': [
    2,
    {
      ignoreEOLComments: true,
      exceptions: {
        Property: true,
        BinaryExpression: false,
        VariableDeclarator: true,
        ImportDeclaration: true,
      },
    },
  ],
  'no-multi-str': 2,
  'no-multiple-empty-lines': [
    2,
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 1,
    },
  ],
  // 与ts有冲突 ts中的类型是可以在定义前调用的
  // 'no-use-before-define': [
  //   2,
  //   {
  //     functions: false,
  //     classes: false,
  //     variables: false,
  //   },
  // ],
  // ts项目中会存在 同时引入两个相同的包 但是第一个引用是作为类型使用
  // 'no-duplicate-imports': 2,
  'no-useless-rename': 2,
  'no-var': 2,
  'no-global-assign': 2,
  'no-unsafe-negation': 2,
  'no-new-object': 2,
  'no-new-require': 2,
  'no-new-symbol': 2,
  'no-new-wrappers': 2,
  'no-new-func': 2,
  'no-obj-calls': 2,
  'no-octal': 2,
  'no-octal-escape': 2,
  'no-path-concat': 2,
  'no-proto': 2,
  // ts项目中不适用 函数重载会存在多次声明
  // 'no-redeclare': 2,
  'no-regex-spaces': 2,
  // 箭头函数中存在一行代码 可能这样代码就是一个赋值操作
  // 'no-return-assign': [2, 'always'],
  'no-self-assign': 2,
  'no-self-compare': 2,
  'no-sequences': 2,
  'no-shadow-restricted-names': 2,
  // 使用ts的规则
  'func-call-spacing': 0,
  'no-sparse-arrays': 2,
  'no-this-before-super': 2,
  'no-throw-literal': 2,
  'no-trailing-spaces': 2,
  'computed-property-spacing': [2, 'never'],
  // 关闭eslint未定义检查(ts会检查)
  'no-undef': 0,
  'no-undef-init': 2,
  'no-unexpected-multiline': 2,
  'no-unmodified-loop-condition': 2,
  'no-unneeded-ternary': [
    2,
    {
      defaultAssignment: false,
    },
  ],
  'no-unreachable': 2,
  'no-unsafe-finally': 2,
  'no-constant-condition': [
    'error',
    {
      checkLoops: false,
    },
  ],
  'default-case': 0,
  'no-empty-function': [
    'error',
    {
      allow: ['functions', 'arrowFunctions'],
    },
  ],
  'no-empty': [
    2,
    {
      allowEmptyCatch: true,
    },
  ],
  'no-useless-call': 2,
  'no-useless-concat': 2,
  'no-tabs': 2,
  'no-useless-computed-key': 2,
  'no-useless-constructor': 2,
  'no-useless-escape': 0,
  'no-whitespace-before-property': 2,
  'no-with': 2,
  'padding-line-between-statements': 0,
  'one-var-declaration-per-line': [2, 'always'],
  'one-var': [2, 'never'],
  'operator-linebreak': [
    2,
    'after',
    {
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  'nonblock-statement-body-position': [
    2,
    'beside',
    {
      overrides: {
        while: 'below',
      },
    },
  ],
  'padded-blocks': [2, 'never'],
  quotes: [
    2,
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: true,
    },
  ],
  'semi-spacing': [
    2,
    {
      before: false,
      after: true,
    },
  ],
  semi: [
    2,
    'always',
    {
      omitLastInOneLineBlock: true,
    },
  ],
  'semi-style': [2, 'last'],
  'space-before-blocks': [2, 'always'],
  'sort-keys': 0,
  'space-before-function-paren': [
    2,
    {
      anonymous: 'ignore',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  'space-in-parens': [2, 'never'],
  'space-infix-ops': 2,
  'space-unary-ops': [
    2,
    {
      words: true,
      nonwords: false,
    },
  ],
  'spaced-comment': [
    2,
    'always',
    {
      markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
      block: {
        exceptions: ['*'],
        balanced: true,
      },
    },
  ],
  'template-curly-spacing': [2, 'never'],
  'use-isnan': 2,
  'valid-typeof': 2,
  'wrap-iife': [
    2,
    'inside',
    {
      functionPrototypeMethods: true,
    },
  ],
  'yield-star-spacing': [2, 'after'],
  yoda: [
    2,
    'never',
    {
      onlyEquality: true,
    },
  ],
  'prefer-const': 0,
  'object-curly-spacing': [
    2,
    'always',
    {
      arraysInObjects: true,
      objectsInObjects: true,
    },
  ],
  'no-use-before-define': 'off',
  'array-bracket-spacing': [2, 'never'],
  'prefer-rest-params': 2,
  // 已声明的变量但是未使用，有时在函数中，只想使用函数形参的第几个，但是前面的变量必须要声明
  // 就可以以 _ 的形式进行命名忽略eslint的检测
  'no-unused-vars': 'off',
  /**
   * 已声明的变量但是未使用，有时在函数中，只想使用函数形参的第几个，但是前面的变量必须要声明
   * 就可以以 _ 的形式进行命名忽略eslint的检测
   * 使用tsline的变量未声明检查，而不适用js eslint的规则
   */
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  // 禁止使用 @ts-ignore
  '@typescript-eslint/prefer-ts-expect-error': 'off',
  '@typescript-eslint/func-call-spacing': 'error',
  // 禁止使用 @ts-ignore
  '@typescript-eslint/ban-ts-ignore': 'off',
  // 显示的声明函数的返回值类型
  '@typescript-eslint/explicit-function-return-type': 'off',
  // 禁止使用 any 类型
  '@typescript-eslint/no-explicit-any': 'off',
  // 允许使用 require() 函数导入模块
  '@typescript-eslint/no-var-requires': 'off',
  // 禁止空函数
  '@typescript-eslint/no-empty-function': 'off',
  // 禁止在 函数/类/变量 定义之前使用它们
  '@typescript-eslint/no-use-before-define': 'off',
  // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
  '@typescript-eslint/ban-ts-comment': 'off',
  // 禁止使用特定类型
  '@typescript-eslint/ban-types': 'off',
  // 不允许使用后缀运算符的非空断言(!)
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  // 自定义事件名的风格 驼峰命名法
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  // 解构 props 会导致响应性丢失
  'vue/no-setup-props-reactivity-loss': 'error',
  // 检查 <script setup> 中的变量是否被使用
  'vue/script-setup-uses-vars': 'error',
  // 检查组件是否被使用
  'vue/no-unused-components': 'error',
  // 检查组件属性的顺序
  'vue/attributes-order': 'off',
  // 事件监听器名称使用连字符
  'vue/v-on-event-hyphenation': ['error', 'always'],
  // 每个文件只能包含一个组件
  'vue/one-component-per-file': 'off',
  // 在标签的右括号之前要求或禁止换行
  'vue/html-closing-bracket-newline': 'off',
  'vue/max-attributes-per-line': 'off', // 每行最大属性数
  // 在多行元素的内容之前和之后需要换行符
  'vue/multiline-html-element-content-newline': 'off',
  // 在单行元素的内容之前和之后需要换行符
  'vue/singleline-html-element-content-newline': 'off',
  // 在模板中强制属性名称的连字符风格
  'vue/attribute-hyphenation': 'error',
  // 非必填的 prop 需要提供默认值
  'vue/require-default-prop': 'off',
  // 自闭合标签
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    },
  ],
  // 组件名中的多个单词应该始终使用短横线连接
  'vue/multi-word-component-names': 'off',
  // 检查 defineProps() 的参数是否有效
  'vue/valid-define-props': 'off',
  // 禁止使用 v-html
  'vue/no-v-html': 'off',
  // 检查宏变量名是否有效
  'vue/require-macro-variable-name': 'error',
};
