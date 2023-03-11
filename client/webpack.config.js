// Imports webpack plugins.
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { InjectManifest } from 'workbox-webpack-plugin';
import path from 'path';

export default () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file that includes a script tag for the main bundle.
      new HtmlWebpackPlugin({
        title: 'Noter',
        offline: 'Noter - Offline',
        template: './index.html',
      }),
      // Adds a service worker to the build using a source and destination file.
      new InjectManifest({
        swSrc: './src-sw.js', // Source file.
        swDest: 'service-worker.js', // Output file for the service worker.
        // Specifies which files should be included in the service worker cache.
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.svg$/, /\.jpg$/, /\.jpeg$/, /\.gif$/]
      }),
      // Is used to generate a PWA manifest file.
      new WebpackPwaManifest({
        // filename specifies the output filename for the generated manifest file. Default: 'manifest.json'.
        // inject - manifest should be automatically injected into the HTML file(s) generated. Default: 'true'.
        fingerprints: false, // A unique hash is generated based on the file's contents - set to false to not do that.
        name: 'Noter',
        short_name: 'Noter',
        description: 'A notepad app for coders',
        start_url: '/',
        publicPath: '/',  // Specifies the public path of the output directory. 
        background_color: '#ffffff',
        theme_color: '#81D4FA',
        ios: true, // Generates Apple Touch icons for iOS devices. - Already have default sizes.
        icons: [ // icon to be generated.
          {
            src: path.resolve('src/images/logo.png'), // The path to the image.
            sizes: [72, 96, 128, 144, 192, 256, 384, 512], // Sizes of the icon.
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
