const path = require('path');
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-swc',
    'storybook-addon-next-router'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../pages/**/*.stories.jsx', '../components/**/*.stories.jsx'],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "zlib": false
    };
    return config;
  },
  docs: {
    autodocs: false
  }
};
