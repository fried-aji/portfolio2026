/** @type {import('stylelint').Config} */

export default {
  extends: [
    // https://github.com/stylelint/stylelint-config-standard/blob/main/index.js
    'stylelint-config-standard',
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    //
    '.astro/**/*',
    'public/**/*',
    'dist/**/*',
  ],
  rules: {
    /**
     * stylelint rules
     * https://stylelint.io/user-guide/rules
     */
    /* 詳細度の高いセレクタの下に詳細度の低いセレクタの記述を禁止しない */
    'no-descending-specificity': null,
    /* 空の宣言ブロックを許可 */
    'block-no-empty': null,
    /* 空のコメントを許可 */
    'comment-no-empty': null,
    /* 空のCSSファイルを許可 */
    'no-empty-source': null,
    /* 16進カラーの宣言ルールを制限しない */
    'color-no-invalid-hex': null,
    /* 字列内の無効な改行を禁止。例外でプレリュード（前置部）とプロパティ値内での文字列の改行は許可 */
    'string-no-newline': [
      true,
      {
        ignore: ['at-rule-preludes', 'declaration-values'],
      },
    ],
    /* ダブルスラッシュコメント（//）を許可 */
    'no-invalid-double-slash-comments': null,
    /* グラデーションの方向宣言ルールを制限しない */
    'function-linear-gradient-no-nonstandard-direction': null,
    /* 単位の不明な宣言を制限しない */
    'unit-no-unknown': null,
    /* メディア機能名の不明な宣言を禁止（overridesでファイル毎に例外設定） */
    'media-feature-name-no-unknown': true,
    /* @ルールに必要なプロパティを指定（@font-faceはfont-familyとsrcを必須に）*/
    'at-rule-property-required-list': {
      'font-face': ['font-family', 'src'],
    },
    /* 汎用カラー名（black、redなど）での色指定を禁止 */
    'color-named': 'never',
    /* 宣言内で許可されるプロパティと単位のペアを指定（line-heightは単位なしを強制） */
    'declaration-property-unit-allowed-list': {
      'line-height': [],
    },
    /* 宣言内におけるスキーム相対URLの使用を禁止 */
    'function-url-no-scheme-relative': true,
    /* セレクタへのベンダープレフィックスの付与を禁止。例外でfont-smoothingのベンダープレフィックスは許可 */
    'selector-no-vendor-prefix': [
      true,
      {
        ignoreSelectors: ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
      },
    ],
    /* プロパティの値は小文字を強制。ただしキャメルケース（currentColorなど）は許可 */
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
      },
    ],
    /* セレクタ内のIDセレクタの数を制限（IDセレクタの使用を禁止） */
    'selector-max-id': 0,
    /* セレクタ内のユニバーサルセレクタ（*）の数を1つに制限（>と+の直後のみ許可） */
    'selector-max-universal': [
      1,
      {
        ignoreAfterCombinators: ['>', '+'],
      },
    ],
    /* font-weightを数値指定を強制（normalやboldはNG）*/
    'font-weight-notation': 'numeric',
    /* @importでのファイル参照を文字列表記に統一（@import url('foo.css');ではなく、@import 'foo.css';） */
    'import-notation': 'string',
    /*
        カスタムプロパティ宣言時の命名をケバブケースに統一（--primaryColorではなく、--primary-colorとする）
        プライベート変数用の_プレフィックスは許可
      */
    'custom-property-pattern': [
      /^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$/,
      {
        message: (name) => `Expected custom property name "${name}" to be kebab-case`,
      },
    ],
    /* クラス命名ルールを無効化 */
    'selector-class-pattern': null,
  },
  overrides: [
    {
      files: ['*.astro', '**/*.astro'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            // :global()の使用を許可
            ignorePseudoClasses: ['global'],
          },
        ],
      },
    },
  ],
};
