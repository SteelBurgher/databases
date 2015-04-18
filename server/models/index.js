var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM `Messages`', function(err, result) {
        if(err) {
          console.log("Error when querying for all messages");
        } else {
          callback(result);
        }
      });
    }, // a function which produces all the messages
    post: function (messageData, callback) {
      db.query('INSERT INTO Messages (messageText) VALUES (' + 
                 db.escape(messageData.message) + ')', function(err, result) {
        if(err) {
          console.log("Error when trying to insert a message into the database");
        } else {
          callback(result);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * FROM `Users`', function(err, result) {
        if(err) {
          console.log("Error when querying for all users");
        } else {
          callback(result)
        }
      })
    },
    post: function (userData, callback) {
      queryArgs = [userData.username, userData.password];
      db.query('INSERT INTO Users (userName, password) VALUES (?,?)', queryArgs, function(err, result) {
        if(err) {
          console.log("Error trying to insert a message into the database");
        } else {
          callback(result);
        }
      });
    }
  },

  authenticate: {
    post: function (userData, callback) {
      queryArgs = [userData.username, userData.password];
      console.log(queryArgs);
      db.query('SELECT userName FROM Users WHERE userName=? AND password=?', queryArgs, function(err, result) {
        if(err) {
          console.log("Error trying to read a message from the database");
        } else {
          console.log(result);
          callback(result);
        }
      });
    }
  }
};

