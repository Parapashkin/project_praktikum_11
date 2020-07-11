const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');




module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }




        ]


    },



    plugins: [
        new WebpackMd5Hash()


    ]
};



