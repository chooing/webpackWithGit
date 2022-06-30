const path = require('path'); // 운영체제별로 상이한 경로문법을 동일하게 하기위해 작성
// const myLoader = require('./myLoader');
const webpack = require('webpack');
const childProcess = require('child_process'); 

const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.DEV_API);
// console.log(process.env.PRO_API);

module.exports = {
    mode: 'development', //production / development
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
            banner: `
                Commit version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Committer name: ${childProcess.execSync('git config user.name')}
                Commit Date: ${new Date().toLocaleString()}
            `
        }),
        new webpack.DefinePlugin({
            dev: JSON.stringify(process.env.DEV_API),
            pro: JSON.stringify(process.env.PRO_API)
        })
    ]

}
