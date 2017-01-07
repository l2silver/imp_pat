var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      includes: [path.join(__dirname, 'src'), path.join(__dirname, 'imp_pat_modules')],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css'],
      includes: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules/dist/css'),
        path.join(__dirname, 'imp_pat_modules')
      ],
    },
    {
      test: /\.pcss$/,
      loaders: ['style', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]', 'postcss'],
      includes: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules/dist/css'),
        path.join(__dirname, 'imp_pat_modules')
      ],
    },
    { test: /\.json$/, loader: 'json' },
    { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    },
    { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    }),
  ],
};

