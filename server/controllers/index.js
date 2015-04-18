var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../utils.js');



module.exports = {
  messages: {
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
  }
};

