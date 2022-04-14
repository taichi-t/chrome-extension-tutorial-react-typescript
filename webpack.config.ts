import path from "path";
//@see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: {
    content: "./src/content/index.ts",
    background: "./src/background/index.ts",
    popup: "./src/popup/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    proxy: {
      "/": "http://localhost:3000/popup.html",
    },
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "popup",
      template: "popup.html",
      filename: "popup.html",
      inject: false,
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: {
              ...assetTags,
              bodyTags: [
                `
                <div id="root"></div>
                <script src="popup.js"></script>
                `,
              ],
            },
            files: assets,
            options,
          },
        };
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: path.resolve(__dirname, "dist") },
        { from: "icon.png", to: path.resolve(__dirname, "dist") },
        { from: "optional.html", to: path.resolve(__dirname, "dist") },
      ],
    }),
  ],
};

export default config;
