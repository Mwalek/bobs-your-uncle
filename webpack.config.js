const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext]",
    clean: true,
  },
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /.s[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /.(png|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ["index"],
      inject: true,
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/about.html"),
      chunks: ["about"],
      inject: true,
      filename: "about.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src",
        },
      ],
    }),
    // new BundleAnalyzerPlugin({}),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
