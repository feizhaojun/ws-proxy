const httpProxy = require("http-proxy");
const http = require("http");
const url = require("url");
const ipAddr = require('./config').ipAddr;

const cmpts = {
  cainiao: 12538,
  pinduoduo: 5000,
  doudian: 13888,
  kuaishou: 16888,
  jingdong: 9113,
}

const create = (type) => {
  const proxy = new httpProxy.createProxyServer({ ws: true });
  
  const proxyServer = http.createServer(function (req, res) {
    proxy.web(req, res);
  });
  
  proxyServer.on("upgrade", function (req, socket, head) {
    const { pathname } = url.parse(req.url);
    if (pathname.indexOf("/") === 0) {
      proxy.ws(req, socket, {
        target: `ws://${ipAddr}:${cmpts[type]}`,
        changeOrigin: true,
        // ignorePath: true,
      });
    }
  });
  
  proxyServer.listen(cmpts[type]);
  console.log('Proxy', type, cmpts[type]);
};

const needCmpts = process.argv[2] ? process.argv[2] : Object.keys(cmpts).join(',');

needCmpts.split(',').forEach(type => {
  try {
    create(type);
  } catch (err) {
    console.log(err);
  }
})