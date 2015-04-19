var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, statusCode, test){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  if(!test) 
    response.end(JSON.stringify(data));
};

