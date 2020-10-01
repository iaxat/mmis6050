const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");                                     
const routeMap = {                                        
  "/": "views/index.html"
};

const sendErrorResponse = res => {                   1
    res.writeHead(httpStatus.NOT_FOUND, {
      "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
  };
  
  http
    .createServer((req, res) => {
      let url = req.url;                               2
      if (url.indexOf(".html") !== -1) {               3
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/html"
        });                                            4
        customReadFile(`./views${url}`, res);          5
      } else if (url.indexOf(".js") !== -1) {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/javascript"
        });
        customReadFile(`./public/js${url}`, res);
      } else if (url.indexOf(".css") !== -1) {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/css"
        });
        customReadFile(`./public/css${url}`, res);
      } else if (url.indexOf(".png") !== -1) {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "image/png"
        });
        customReadFile(`./public/images${url}`, res);
      } else {
        sendErrorResponse(res);
      }
    })
    .listen(3000);
  
  console.log(`The server is listening on port number: ${port}`);
  
  const customReadFile = (file_path, res) => {           6
    if (fs.existsSync(file_path)) {                      7
      fs.readFile(file_path, (error, data) => {
        if (error) {
          console.log(error);
          sendErrorResponse(res);
          return;
        }
        res.write(data);
        res.end();
      });
    } else {
      sendErrorResponse(res);
    }
  };