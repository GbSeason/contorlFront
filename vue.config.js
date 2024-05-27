const path = require('path')
let timeStamp = new Date().getTime();
module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    // webpack-dev-server 相关配置
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        // http 代理配置
        //proxy: 'http://123.60.63.103:8088'
        proxy: {
            // '/pms': {
            //     target: 'https://bdoui.chinaeast.cloudapp.chinacloudapi.cn:8003/pmsservertest',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/pms': '/pms'
            //     }

            // },
            '/socket.io': {
                target: 'http://localhost:18696/socket.io',
                changeOrigin: true,
                ws: true
            }
        }

    },
    outputDir: process.env.outputDir,
    publicPath: "./",
    assetsDir: "static",
    filenameHashing: false,
    chainWebpack: config => {
        // config.optimization.minimize(process.env.NODE_ENV === 'development'?false:true);
        config.optimization.minimize(false);
    },
    pluginOptions: {
        windicss: {

        },
    },
    configureWebpack: {    //重点
        devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        externals: {
            './cptable': 'var cptable'
        },
        output: {
            filename: `js/js[name].${timeStamp}.js`,
            chunkFilename: `js/chunk.[id].${timeStamp}.js`,
        },
        //关闭webpack 性能提示
        performance:{
            hints:false
        }
    },
    css: {
        sourceMap: false,
        // loaderOptions: {
        //     sass: {
        //         // 全局引入变量和mixin
        //         data: `
        //           @import "@/style/mixin.scss";`
        //     }
        // },
        extract: {
            ignoreOrder: true,
            filename: `css/[name].${timeStamp}.css`,
            chunkFilename: `css/chunk.[id].${timeStamp}.css`,
        },
        // extract: false
    }
}
