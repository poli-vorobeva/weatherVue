
const {VueLoaderPlugin}=require("vue-loader")
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin= require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
                           patterns: [
                               {from: "./src/assets", to: "./public/assets"},
                           ],
                       }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['vue-style-loader',
                    'css-loader',],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: false,
                        },
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // {
            //     test: /\.sass$/i,
            //     use: ['vue-style-loader','css-loader',{
            //         loader:'sass-loader',
            //         options: {
            //             indentedSyntax:true,
            //             sassOptions:{
            //                 indentedSyntax:true
            //             },
            //             additionalData:`@import "./src/main.scss"`
            //         }
            //     }],
            // },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        alias: {
            'vue': path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
