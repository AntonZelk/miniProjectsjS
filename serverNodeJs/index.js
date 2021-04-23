let fs = require("fs");
let http = require("http");

let getPage = (nameUrl, response, statusCode = 200) => {
  if (nameUrl == "/") {
    nameUrl = "index";
  }
  fs.readFile("pages/" + nameUrl + ".html", "utf8", (err, data) => {
    if (!err) {
      fs.readFile("elems/menu.html", "utf8", (err, menu) => {
        if (err) throw err;

        data = data.replace(/\{\{menu\}\}/, menu);
        fs.readFile("elems/footer.html", "utf8", (err, footer) => {
          if (err) throw err;

          data = data.replace(/\{\{footer\}\}/, footer);

          response.setHeader("Content-Type", "text/html");
          response.statusCode = statusCode;
          response.write(data);
          response.end();
        });
      });
    } else {
      if (statusCode != "404") {
        getPage("404", response, 404);
      } else {
        throw err;
      }
    }
  });
};

let getFiles = (request, response, formatHeaders, statusCode = 200) => {
  let file = request.url.slice(1);

  fs.readFile(file, "utf8", (err, data) => {
    if (!err) {
      response.setHeader("Content-Type", `${formatHeaders}`);
      response.statusCode = statusCode;
      response.write(data);
      response.end();
    } else {
      if (statusCode != "404") {
        getPage("404", response, 404);
      } else {
        throw err;
      }
    }
  });
};

http
  .createServer((request, response) => {
    if (request.url != "/favicon.ico") {
      if (request.url.endsWith(".css")) {
        getFiles(request, response, "text/css");
      } else if (request.url.endsWith(".js")) {
        getFiles(request, response, "text/javascript");
      } else if (request.url.endsWith(".jpg")) {
        getFiles(request, response, "image/jpg");
      } else {
        getPage(request.url, response);
      }
    }
  })
  .listen(8888);
