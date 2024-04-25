/**
 * @type {import('czg').UserConfig}
 */
module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 50],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'type',
        'build',
        'ci',
        'revert',
        'chore',
      ],
    ],
  },
  prompt: {
    alias: {
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
      b: 'build: bump dependencies',
      c: 'chore: update config',
    },
    messages: {
      type: '[type] 选择你要提交的类型 :',
      scope: '[scope] 选择一个提交范围（可选）:',
      customScope: '[customScope] 请输入自定义的提交范围 :',
      subject: '[subject] 填写简短精炼的变更描述 :\n',
      body: '[body] 填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '[breaking] 当前代码相比之前有重大更改，这里需要提供描述。使用 "|" 换行 :\n',
      footerPrefixesSelect: '[footerPrefixesSelect] 选择关联issue前缀（可选）:',
      customFooterPrefix: '[customFooterPrefix] 输入自定义issue前缀 :',
      footer: '[footer] 列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit？',
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     新增功能 | A new feature',
      },
      {
        value: 'fix',
        name: 'fix:      修复缺陷 | A bug fix',
      },
      {
        value: 'docs',
        name: 'docs:     文档更新 | Documentation only changes',
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance',
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests',
      },
      {
        value: 'type',
        name: 'type:     类型定义/变更 | Changes that affect the types definition',
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies',
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts',
      },
      {
        value: 'revert',
        name: 'revert:   回退代码 | Revert to a commit',
      },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files',
      },
    ],
    useEmoji: false,
    emojiAlign: 'left',
    customScopesAlign: 'top',
    upperCaseSubject: false,
    skipQuestions: ['footerPrefix', 'footer'],
  },
};
