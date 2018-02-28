const links = {};
const respondJSON = (request, response, status, Object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(Object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};
//need add link and get link methods
//mongoDB PW 5DgCmJuuMMjueXdP
const getLink = (request, response) => {
        const responseJSON = {
            links,
        };
        respondJSON(request, response, 200, responseJSON);
}
const addLink = (request, response, body) => {
    const responseJSON = {
        message: 'Name and Link are both required.',
    };
    console.dir(body);
    if(!body.name || !body.link){
        respondJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }
    
    let responseCode = 201;
    if(links[body.name]){
        responseCode = 204;
    } else {
        links[body.name] = {};
    }
    links[body.name].link = body.link;
    console.dir(links);
    if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';

    return respondJSON(request, response, responseCode, responseJSON);
    }

  return respondJSONMeta(request, response, responseCode);
}
module.exports = {
  notFound,
  notFoundMeta,
  getLink,
  addLink,
};