import path from 'path';
import {fileURLToPath} from 'url';
import webpackNodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

const nodeExternals = webpackNodeExternals;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
       library: {
        type: "umd",
      },
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
