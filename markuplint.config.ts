/*
 * 参考：https://github.com/SaekiTominaga/config/tree/main/packages/markuplint
 */

import type { Config } from '@markuplint/ml-config';

const config: Config = {
  excludeFiles: [
    //
    '.astro/**/*',
    'public/**/*',
    'dist/**/*',
  ],
  parser: {
    '\\.astro$': '@markuplint/astro-parser',
  },
  rules: {
    'attr-duplication': true,
    'deprecated-attr': true,
    'deprecated-element': true,
    doctype: true,
    'id-duplication': true,
    'invalid-attr': {
      options: {
        allowAttrs: [
          {
            name: 'tabindex',
            value: {
              enum: ['-1', '0'],
            },
          },
          {
            name: ['{...props}', '{...rest}'], // Propsのレストパラメータを許可
            value: {
              type: 'RegExp',
            },
          },
        ],
        ignoreAttrNamePrefix: ['x-', ':', '@'], // Alpineディレクティブを許可
      },
    },
    'no-empty-palpable-content': false,
    'no-orphaned-end-tag': true,
    'permitted-contents': true,
    'placeholder-label-option': true,
    'require-datetime': true,
    'required-attr': true,
    'required-element': true,
    'label-has-control': true,
    'landmark-roles': true,
    'neighbor-popovers': true,
    'no-ambiguous-navigable-target-names': true,
    'no-consecutive-br': true,
    'no-refer-to-non-existent-id': false,
    'require-accessible-name': true,
    'required-h1': true,
    'table-row-column-alignment': false,
    'use-list': false,
    'wai-aria': true,
    'class-naming': false,
    'no-hard-code-id': false,
    'no-use-event-handler-attr': true,
    'attr-value-quotes': false,
    'case-sensitive-attr-name': 'lower',
    'case-sensitive-tag-name': 'lower',
    'character-reference': false,
    'end-tag': true,
    'ineffective-attr': true,
    'no-boolean-attr-value': false,
    'no-default-value': true,
  },
  nodeRules: [
    {
      selector: 'html',
      rules: {
        'invalid-attr': {
          options: {
            ignoreAttrNamePrefix: ['prefix'],
          },
        },
        'required-attr': ['lang'],
      },
    },
    {
      selector: 'meta[property]',
      rules: {
        'invalid-attr': false,
        'required-attr': false,
      },
    },
    {
      selector: 'search',
      rules: {
        'required-attr': ['role'],
        'wai-aria': {
          options: {
            disallowSetImplicitRole: false,
          },
        },
      },
    },
    {
      selector: 'img',
      rules: {
        'required-attr': ['alt'],
      },
    },
    {
      selector: 'iframe',
      rules: {
        'required-attr': ['title'],
      },
    },
    {
      selector: 'object',
      rules: {
        'required-attr': ['data', 'type', 'role', 'aria-labelledby'],
      },
    },
    {
      selector: 'figcaption ~ table, table:has(~ figcaption)',
      rules: {
        'disallowed-element': ['caption'],
        'require-accessible-name': false,
      },
    },
    {
      selector: 'dl',
      rules: {
        'permitted-contents': false,
      },
    },
    {
      selector: 'input[pattern]',
      rules: {
        'required-attr': {
          value: [
            {
              name: 'title',
            },
          ],
        },
      },
    },
    {
      regexSelector: {
        nodeName: 'details',
        attrName: 'name',
        attrValue: '^(?<value>.+)$',
        combination: {
          combinator: ' ',
          nodeName: 'details',
        },
      },
      rules: {
        'invalid-attr': {
          options: {
            disallowAttrs: {
              name: {
                pattern: '{{ value }}',
              },
            },
          },
          reason:
            'A document must not contain a details element that is a descendant of another details element in the same details name group.',
        },
      },
    },
    {
      /* https://github.com/markuplint/markuplint/issues/1948 */
      selector: 'template *',
      rules: {
        'no-empty-palpable-content': false,
        'require-accessible-name': false,
      },
    },
    {
      /* https://github.com/markuplint/markuplint/issues/1948 */
      selector: ':has(> template)',
      rules: {
        'wai-aria': false,
      },
    },
    {
      /* https://github.com/markuplint/markuplint/issues/673 */
      selector: '[role=radiogroup]',
      rules: {
        'wai-aria': false,
      },
    },
    {
      /* https://ja.splidejs.com/guides/pagination/ */
      selector: '.splide__pagination',
      rules: {
        'wai-aria': false,
      },
    },
    {
      /* https://ja.splidejs.com/guides/arrows/ */
      selector: '.splide__arrow',
      rules: {
        'require-accessible-name': false,
      },
    },
    {
      /* https://ja.splidejs.com/guides/autoplay/ */
      selector: '.splide__toggle',
      rules: {
        'require-accessible-name': false,
      },
    },
  ],
  pretenders: [
    {
      selector: 'AstroLink',
      as: 'a',
    },
    {
      selector: 'SplitText',
      as: 'span',
    },
  ],
  overrideMode: 'merge',
  overrides: {},
};

export default config;
