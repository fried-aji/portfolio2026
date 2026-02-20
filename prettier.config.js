/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
export default {
  plugins: [
    //
    'prettier-plugin-astro',
  ],
  printWidth: 120,
  singleQuote: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
