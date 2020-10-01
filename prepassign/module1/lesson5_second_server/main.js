const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();


app.on("request", (req, res) => {                                  1
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });                                                              2

  let responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage);                                        3

});

app.listen(port);
console.log(`The server has started and is listening on port number:
 ${port}`);