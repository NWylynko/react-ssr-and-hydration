const path = require('node:path');

module.exports = {
  // heres the entrypoint for client side
  entry: './client/index.tsx',
  // change this to production to get a smaller build size and higher performance
  mode: "development",
  output: {
    // we are saving to the static folder,
    // this is the folder that is served up by fastify
    path: path.resolve(__dirname, 'static'),
    // we have called the file main.js, this is what needs to be included in the head
    filename: 'main.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};