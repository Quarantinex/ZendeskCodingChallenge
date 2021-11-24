const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api", { target: "https://zccabhishek98.zendesk.com" , secure: false, changeOrigin: true}));
};