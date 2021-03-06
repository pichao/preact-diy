const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    console.log(env, 'env');
    console.log(argv, 'argv');
    return {
        entry: ['@babel/polyfill', './src/index.tsx'],

        target: 'web',
        mode: 'development',
        devtool: 'source-map',

        output: {
            // publicPath: 'assets/',
            path: path.resolve(__dirname, 'build'),
            filename: 'js/[name].[contenthash:8].js',
        },

        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            alias: {
                utils: path.resolve(__dirname, 'src/utils'),
                components: path.resolve(__dirname, 'src/components'),
                assets: path.resolve(__dirname, 'src/assets'),
                pages: path.resolve(__dirname, 'src/pages'),
                store: path.resolve(__dirname, 'src/store'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                },
                {
                    test: /\.(s[ac]|c)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {
                                                // ????????????
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                        'sass-loader',
                        // 'post-loader', //??????post-loader?????????
                    ],
                },
                // {
                //     test: /\.(png|jpe?g|gif)$/i,
                //     loader: 'file-loader',
                //     options: {
                //         esModule: false,
                //         outputPath: 'assets',
                //     },
                // },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                esModule: false,
                                limit: 100,
                                outputPath: 'assets/', // ?????????????????????????????? output ???????????? ; ??????????????????????????????
                                // publicPath: 'assets/', // ?????????????????????????????? public ???????????? ; ??????????????????????????????
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            // new CopyWebpackPlugin([
            //     {
            //         from:'./dll/vendor.dll.js',
            //         to:'vendor.dll.js'
            //     }
            // ]),
            new PrerenderSPAPlugin({
                //??????????????????????????????????????????????????????
                staticDir: path.join(__dirname, './build'),
                indexPath: path.join(__dirname, './build', 'index.html'),
                //routes????????????????????????????????????
                routes: ['/', '/about$'],
                renderer: new Renderer({
                    renderAfterTime: 5000,
                    inject: {
                        foo: 'bar',
                    },
                    // headless?????????????????????????????????????????????????????????
                    headless: false,
                }),
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    siteId: process.env.siteId,
                    name: argv.name,
                }),
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
            new webpack.ProgressPlugin(),
        ],
        devServer: {
            compress: true,
            port: 9001,
            historyApiFallback: true, // ????????????????????????404
            proxy: {
                '/api': {
                    target: 'https://api.github.com/users',
                    changeOrigin: true,
                    http2: true,
                    pathRewrite: { '^/api': '' },
                    // secure: false,
                },
            },
        },
    };
};
