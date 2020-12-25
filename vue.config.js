const path = require('path')
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        },
        clientLogLevel: 'warning'
    },
    configureWebpack: {
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                src: path.join(__dirname, 'src'),
                styles: path.join(__dirname, 'src/assets/styles')
            }
        }
    }
}
