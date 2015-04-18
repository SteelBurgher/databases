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
    post: function (messageData, callback) {
      db.query('INSERT INTO Users (userName) VALUES (' + db.escape(messageData.username) + ')', function(err, result) {
        if(err) {
          console.log("Error trying to insert a message into the database");
        } else {
          callback(result);
        }
      });
    }
  }
};

