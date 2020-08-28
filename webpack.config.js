const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.[contenthash:8].js",
    // publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.svg/,
      //   use: ['file-loader']
      // },
      { //字体文件
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: "[name].[ext]",
          outputPath: './fonts'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({}),
  ]
};
module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          // 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     publicPath: './',
          //     // hmr: process.env.NODE_ENV === 'development',
          //   },
          // },
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "postcss-loader", // stylus-loader帮我们生成了sourceMap，postcss-loader也会生成，但是我们不需要再次生成了
            options: { sourceMap: true }
          }, {
            loader: "stylus-loader" // compiles stylus to CSS
          }]
      },

    )
  }

  if (argv.mode === 'production') {
    // config.entry = {
    //   app: "./src/index.js",
    //   vendor: ['vue']
    // }
    config.output.filename = "[name].[contenthash:8].js"
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          // 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          // {
          //   loader: "style-loader" // creates style nodes from JS strings
          // },
          {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "postcss-loader", // stylus-loader帮我们生成了sourceMap，postcss-loader也会生成，但是我们不需要再次生成了
            options: { sourceMap: true }
          }, {
            loader: "stylus-loader" // compiles stylus to CSS
          }]
      },

    )
    config.optimization = {
      splitChunks: {
        chunks: 'initial',
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendors: {
            chunks: "all", // 使用 all 模式
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 下的模块
            name: "vendors", // 包命名，最终的命名要结合 output 的 chunkFilename
            minChunks: 1,
            minSize: 30000,
            priority: 10 // 设置优先级
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `manifest.${entrypoint.name}`
      }
    },
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash:8].css",
          chunkFilename: "[name].[contenthash:8].css",
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
      )
  }

  return config;
};