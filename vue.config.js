module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/baiduApi': {
                target: 'https://aip.baidubce.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/baiduApi': ''
                }
            },
            '/voiceApi': {
                target: 'http://vop.baidu.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/voiceApi': ''
                }
            }
        }
    }
}