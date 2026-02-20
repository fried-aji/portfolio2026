import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  globalIgnores([
    //
    '.astro/**/*',
    'public/**/*',
    'dist/**/*',
  ]),
  // https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
  eslint.configs.recommended,
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended.ts
  tseslint.configs.recommended,
  // https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules
  eslintPluginUnicorn.configs.recommended,
  astro.configs['flat/jsx-a11y-recommended'],
  {
    // .astroファイルのフロントマターにTypeScriptパーサーを明示
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  {
    rules: {
      /*
       * https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules
       */
      /* 関数の宣言位置を制限しない */
      'unicorn/consistent-function-scoping': 0,
      /* ファイル名の命名規則を制限しない */
      'unicorn/filename-case': 0,
      /* 無名関数（orクラス）のデフォルトエクスポートを許可 */
      'unicorn/no-anonymous-default-export': 0,
      /* 空ファイルを許可 */
      'unicorn/no-empty-file': 0,
      /* nullの使用を許可 */
      'unicorn/no-null': 0,
      /* 数値リテラルは小文字を強制 */
      'unicorn/number-literal-case': [
        'error',
        {
          hexadecimalValue: 'lowercase',
        },
      ],
      /* .innerTextメソッドの使用を許可 */
      'unicorn/prefer-dom-node-text-content': 0,
      /* window、self、globalよりもglobalThisの使用を優先しない */
      'unicorn/prefer-global-this': 0,
      /* querySelector系メソッドの使用を優先しない（getElementByIdも使用可） */
      'unicorn/prefer-query-selector': 0,
      /* 略語の使用を許可 */
      'unicorn/prevent-abbreviations': 0,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.nodeBuiltin,
        ...globals.browser,
      },
    },
  },
]);
