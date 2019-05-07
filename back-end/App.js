var restify = require("restify");
var server = restify.createServer({ name: "Data Visualisation Backend" });

function respond(req, res, next) {
  console.log("Requesting, sending response ....");
  var dataToSend = require(`./${req.params.filename}`);
  res.send(200, dataToSend);
  next();
}

server.get("/amcharts/:filename", respond);

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
