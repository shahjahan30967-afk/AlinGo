GET  /api/digital/services
POST /api/digital/order
const { getServices, orderService } = require("./digital.controller");

module.exports = (req, res) => {
  if (req.method === "GET" && req.url === "/api/digital/services") {
    return getServices(req, res);
  }

  if (req.method === "POST" && req.url === "/api/digital/order") {
    return orderService(req, res);
  }

  res.statusCode = 404;
  res.end("Digital API Not Found");
};
