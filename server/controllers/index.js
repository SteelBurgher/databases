var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../utils.js');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

module.exports = {
  messages: {
    options: function(req, res) {
      utils.sendResponse(res, {});
    },
    get: function (req, res) {
      models.messages.get(function(result) {
        utils.sendResponse(res, result);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function(result) {
        utils.sendResponse(res, result, 201);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    options: function(req, res) {
      utils.sendResponse(res, {});
    },
    get: function (req, res) {
      models.users.get(function(result) {
        utils.sendResponse(res, result);
      });
    },
    post: function (req, res) {
      models.users.post(req.body, function(result) {
        utils.sendResponse(res, result, 201);
      });
    }
  },

  // a controller to handle authentication
  authenticate: {
    options: function(req, res) {
      utils.sendResponse(res, {});
    },
    get: function (req, res) {
    },
    post: function (req, res) {
      models.authenticate.post(req.body, function(result) {
        if(result.length === 0) {
          utils.sendResponse(res, {}, 404);
        } else {
          utils.sendResponse(res, {});
        }
      });
    }
  },

  login: {
    options: function(req, res) {
      console.log("in options");
      utils.sendResponse(res, {});
    },
    get: function(req, res){
      res.sendFile('chatroom.html', {root: __dirname + '/../../client/'}, function(err) {
        if(err) {
          console.log(err);
          res.status(err.status).end();
        } else {
          console.log("File sent");
          res.end();
        }
      });
    },
    post: function (req, res) {
     
    }
  }
};

