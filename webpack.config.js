const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    //指定环境
    // mode: 'development',//开发环境
    mode: 'production',//生产环境
    //单一入口
    // entry: './src/index.js',
    // entry: {main:'./src/index.js'},
    //多入口
    entry: {
        index: './src/index.js',
    },
    //出口
    output: {
        //「入口分块(entry chunk)」的文件名模板
        // filename: '[name]-[chunkhash]-bundle.js',
        filename: '[name]-[hash]-bundle.js',
        //指定输出参考根路径
        publicPath: '/',
        //所有输出文件的目标路径
        path: path.resolve(__dirname, 'dist')
    },
    // 别名配置
    resolve: {
        alias: {
            pages: path.resolve(__dirname, './src/pages'),
            util: path.resolve(__dirname, './src/util'),
            common: path.resolve(__dirname, './src/common'),
            api: path.resolve(__dirname, './src/api'),
        }
    },
    module: {
        rules: [
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    "css-loader"
                ]
            },
            //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 400
                        }
                    }
                ]
            },
            //bable
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['env', 'react'],
                        presets: ['env', 'es2015', 'react', 'stage-3'],
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]]
                    },
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            // 全局主题自定义颜色
                            'primary-color': '#1890ff',
                            'link-color': '#1890ff',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: './src/index.html',//模板文件
            filename: 'index.html',//输出的文件名
            //inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
            hash: true,//给生成的js/css文件添加一个唯一的hash
        }),
        new MiniCssExtractPlugin({})
    ],
    devServer: {
        contentBase: './dist',//内容的目录
        port: 3003,//指定服务端口
        proxy: [
            {
                // 配置跨域代理
                changeOrigin: true,
                context: [ // 例: 以 '/pool' 开头的请求接口, 都是以target指定的地址去代理请求数据
                    '/manager',
                    '/purchase'
                ],
                target: 'http://61.147.123.84:10080',
            },
            {
                // 配置跨域代理
                changeOrigin: true,
                context: [ // 例: 以 '/v1' 开头的请求接口, 都是以target指定的地址去代理请求数据
                    '/v1',
                    '/v2',
                    '/v3',
                    '/v4',
                    '/v5',
                    '/v6',
                    '/v7'
                ],
                target: 'http://61.147.123.84:10011' // lotus-jp接口地址
            }
        ],
        historyApiFallback: true//让h5路由不向后端发送请求
    },
}