// Imports webpack plugins.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file that includes a script tag for the main bundle.
      new HtmlWebpackPlugin({
        title: 'Noter',
        template: './index.html',
      }),
      // Adds a service worker to the build using a source and destination file.
      new InjectManifest({
        swSrc: './src-sw.js', // Source file.
        swDest: 'src-sw.js', // Output file for the service worker.
        // Specifies which files should be included in the service worker cache.
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.svg$/, /\.jpg$/, /\.jpeg$/, /\.gif$/]
      }),
      // Is used to generate a PWA manifest file.
      new WebpackPwaManifest({
        // filename specifies the output filename for the generated manifest file. Default: 'manifest.json'.
        fingerprints: false, // A unique hash is generated based on the file's contents - set to false to not do that.
        inject: true,
        name: 'Noter - The coders notepad',
        short_name: 'Noter',
        description: 'A notepad app for coders',
        start_url: '/',
        publicPath: '/',  // Specifies the public path of the output directory. 
        background_color: '#ffffff',
        theme_color: '#81D4FA',
        icons: [ // icon to be generated.
          {
            src: path.resolve('src/images/logo.png'), // The path to the image.
            sizes: [96, 128, 192, 512], // Sizes of the icon.
            type: 'image/png',
            destination: path.join('assets', 'icons'), // The destination directory where the generated icons will be saved.
          },
        ]
      }),
    ],
    module: {
      rules: [
        {
          // CSS loaders.
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Babel loader to use ES6.
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
