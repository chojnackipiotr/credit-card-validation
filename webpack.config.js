module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          output: 'images',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  }
};

// module.exports = {
//   entry: './src/index.js',
//   mode: 'development',
//   output: {
//     filename: "main.[hash].js",
//     path: path.resolve(__dirname, 'dist'),
//   },
  // plugins: [
  //   new HTMLWebpackPlugin({
  //     template: "./src/template.html",
  //   }),
  //   new CleanWebpackPlugin(),
  // ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.scss$/,
  //       use: [
  //         'style-loader',
  //         'css-loader',
  //         'sass-loader',
  //       ],
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif)$/i,
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[hash].[ext]',
  //         output: 'images',
  //       },
  //     },
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: "babel-loader",
  //     },
  //   ],
  // },
// };
//
