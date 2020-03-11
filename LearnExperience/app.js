const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("请求消息对象", req.headers, "相应消息对象", res.headers);
  res.writeHead(200, "OKS", {
    "content-type": "text/html;charset=utf-8"
  });
  res.write("<h1>888修改后服务器返回的内容</h1>");
});
server.listen(8080);
server.on("error", err => {
  console.log("服务器出错了", err);
});
