import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginImport from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      ...compat.extends('@feature-sliced'),
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'eslint-plugin-import': pluginImport
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'eslint-plugin-import/no-unused-modules': ['error'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/exhaustive-deps': 'off',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',

          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'internal',
            'type',
            'object'
          ],
          pathGroups: [
            {
              pattern: '@{pages,widgets/*,features/*,entities/*,shared/*,shared/*/**}',
              group: 'parent',
              position: 'after'
            }
          ],
          alphabetize: {
            order: 'asc'
          },
          pathGroupsExcludedImportTypes: [],
          distinctGroup: true
        }
      ]
    }
  }
)
