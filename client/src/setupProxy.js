const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware (['/api','/uploads'], {
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    )
}