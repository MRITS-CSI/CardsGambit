const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://173.230.139.42:8000/",
      changeOrigin: true,
    })
  );
};
