const path = require('path'); // 운영체제별로 상이한 경로문법을 동일하게 하기위해 작성
// const myLoader = require('./myLoader');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve('./src/app.js')
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [
            //         path.resolve('./myLoader.js')
            //     ]
            // }
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                    maxSize: 200 * 1024
                    }
                },
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin({
            banner: '마지막 빌드 시간은 ' + new Date().toLocaleString() + ' 입니다.'
        })
    ]

}
