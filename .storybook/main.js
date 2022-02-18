const custom = require('../webpack/webpack.storybook.js');

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  webpackFinal: config => {
    return {
      ...config,
      resolve: { ...custom.resolve },
    };
  },
  addons: [
    { name: '@storybook/addon-knobs' },
    { name: '@storybook/addon-toolbars' },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
};
