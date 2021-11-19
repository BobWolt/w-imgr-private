const path = require("path");
const webpack = require("webpack");
var copyWebpackPlugin = require("copy-webpack-plugin");
const bundleOutputDir = "./dist";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  return [
    {
      entry: "./public/app.js",
      output: {
        filename: "w-imgr.js",
        path: path.resolve(bundleOutputDir),
      },
      optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
      devServer: {
        compress: true,
        historyApiFallback: true,
        https: false,
        open: true,
        hot: true,
        port: 5000,
        proxy: {},
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new copyWebpackPlugin({ patterns: [{ from: "public" }] }),
          ]
        : [new UglifyJsPlugin()],
      module: {
        rules: [
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader" + (isDevBuild ? "" : "?minimize"),
            ],
          },
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/env",
                    {
                      targets: {
                        browsers: ["ie 6", "safari 7"],
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    },
  ];
};
