const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
   mode: 'production',
   entry: {
       isvserver: './src/isvserver.ts',
    //    'api/products': './src/api/products.ts',
   },
   target: "node",
   externals: [nodeExternals()],

   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
       clean: true,
    },
   resolve: {
        extensions: ['.tsx', '.ts', '.js'],
   },
   plugins: [
        new CopyPlugin({
        patterns: [
            { from: "./src/api", 
            globOptions: {
                ignore: ["**/*.ts"],
            }, 
            to: "api" ,
            }
        ],
        }),
    ],
   module: {
       rules: [
           {
               test: /\.tsx?/,
               use: 'ts-loader',
               exclude: /node_modules/
           }
       ]
   }
}
