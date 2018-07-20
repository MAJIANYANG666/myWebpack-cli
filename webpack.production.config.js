//npm install --save-dev uglifyjs-webpack-plugin
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWepackPlugin = require("clean-webpack-plugin")

module.exports = {
  
  entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle-[hash].js"//打包后输出文件的文件名
  },
  devtool: 'null',//注意修改了这里，这能大大压缩我们的打包代码
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新,
    hot: true,
  },
  module: {
    rules: [
      {
        test:/(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     "env","react"
          //   ]
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // use:[
        //   {
        //     loader:"style-loader"
        //   },
        //   {
        //     loader:"css-loader",
        //     // 每次配置完webpack.config.js都要重启服务器
        //     options: {
        //       modules:true, // 指定启用css modules
        //       loaclIdentName: '[name]__[loacl}__[hash:base64:5]'// 指定css的类名格式
        //     }
        //   },
        //   {
        //     loader:"postcss-loader"
        //   }
        // ]
        use:ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:[
            {
            loader:"css-loader",
            options:{
              modules: true,
              loaclIdentName: '[name]__[loacl}__[hash:base64:5]'// 指定css的类名格式
            }
            },
            {
              loader:"postcss-loader"
            }
        ]
        })
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css"),
    new CleanWepackPlugin("build/*.*",{
      root: __dirname,
      verbose:true,
      dry:false
    })
  ],
  optimization: {
    minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
      compress: false
      }
    })
  ]
},
};



