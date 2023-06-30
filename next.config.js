const withFonts = require('next-fonts');
const withTranspileModules = require('next-transpile-modules')(["@moengage/web-sdk"]);

module.exports = withFonts(withTranspileModules({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });

    return config;
  },
}));
