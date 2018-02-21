const http = require('http');
const query = require('querystring');
const url = require('url');

const htmlHandler = require('./htmlHandler.js');
const JSONHandler = require('./jsonHandler.js');

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://sxv2721:<5DgCmJuuMMjueXdP>@cluster0-shard-00-00-pueaw.mongodb.net:27017,cluster0-shard-00-01-pueaw.mongodb.net:27017,cluster0-shard-00-02-pueaw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
/*MongoClient.connect(uri, function(err, db) {
  db.close();
});/**/

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addLink') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();

      const bodyParams = query.parse(bodyString);

      JSONHandler.addLink(request, res, bodyParams);
    });
  }/**/
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  switch (request.method) {
    case 'GET':
      if (parsedURL.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedURL.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } /*else if (parsedURL.pathname === '/style.css') {
        jsonHandler.getLinks(request, response, parsedURL);
      }/**/ else {
        JSONHandler.notFound(request, response);
      }
      break;
    case 'HEAD':
     /* if (parsedURL.pathname === '/getUsers') {
        JSONHandler.getUsersMeta(request, response);
      } else {/**/
        JSONHandler.notFoundMeta(request, response);
      //}
      break;
    case 'POST':
      handlePost(request, response, parsedURL);
      break;
    default:
      JSONHandler.notFound(request, response);
      break;
  }
  console.dir(parsedURL);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);