import antfu from '@antfu/eslint-config'
import storybook from 'eslint-plugin-storybook'

export default antfu({
  typescript: true,
  stylistic: true,
  imports: true,
  react: true,
  jsx: {
    a11y: true,
  },
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
}, storybook.configs['flat/recommended'])
  .override('antfu/react/rules', {
    rules: {
      'react/no-comment-textnodes': 'off',
      'react/jsx-no-comment-textnodes': 'warn',
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',
      'react/no-unnecessary-use-prefix': 'warn',
      'react-hooks-extra/prefer-use-state-lazy-initialization': 'off',
      'react/prefer-use-state-lazy-initialization': 'warn',
    },
  })
  .override('antfu/stylistic/rules', {
    rules: {
      'style/jsx-closing-tag-location': 'off',
    },
  })
