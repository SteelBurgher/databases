// YOUR CODE HERE:
app = {

    // server: 'https://api.parse.com/1/classes/chatterbox',
    server: 'http://127.0.0.1:3000/classes',

    initLogin: function() {
      console.log('in log in');

      $('#loginForm').on('submit', app.handleLogin);
      $('#signUp').on('submit', app.handleSignup);

      app.$loginName = $('#usernameLogin');
      app.$loginPassword = $('#passwordLogin');
      app.$signUpName = $('#usernameSignUp');
      app.$signUpPassword = $('#passwordSignUp');
      app.$errorLogin = $('#errorLogin');
      app.$errorSignUp = $('#errorSignUp');
      app.$signUpSuccess = $('#signUpSuccess');

    },

    init: function() {
      console.log('running chatterbox');

      app.onscreenMessages = {};
      app.blockedUsers = ['BRETTSPENCER', 'Chuck Norris'];

      // cache some dom references
      app.$text = $('#message');


      app.loadMsgs();
      //setInterval( app.loadMsgs.bind(app), 1000);

      $('#send').on('submit', app.handleSubmit);
    },

    handleLogin: function(e){
      e.preventDefault();
      app.$errorLogin.text('');

      if(app.$loginName.val().length > 0 && app.$loginPassword.val().length > 0) {
        app.authenticate(app.$loginName.val(), app.$loginPassword.val());
      } else {
        app.$errorLogin.text(" Enter your username and password");
      }
    },

    handleSignup: function(e){
      e.preventDefault();
      app.$errorSignUp.text('');
      if(app.$signUpName.val().length > 0 && app.$signUpPassword.val().length > 0) {
        app.signUp(app.$signUpName.val(), app.$signUpPassword.val());
      } else {
        app.$errorSignUp.text(" Create a new username and password");
      }

    },
    
    authenticate: function(username, password) {
      app.startSpinner();
      var userData = {username: username, password: password};
      $.ajax({
        type: 'POST',
        url: app.server + '/authenticate',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function(json){
          app.$errorLogin.text('');
          console.log('signed in');
        },
        error: function() {
          app.$errorLogin.text('');
          app.$errorLogin.text(" Invalid username or password.");
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    signUp: function(username, password) {
      app.startSpinner();
      var userData = {username: username, password: password};
      $.ajax({
        type: 'POST',
        url: app.server + '/users',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function(json){
          app.$errorSignUp.text('');
          app.$signUpSuccess.text(" You've signed up! Log in above.");
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    handleSubmit: function(e){
      e.preventDefault();

      var message = {
        username: app.username,
        text: app.$text.val()
      };

      app.$text.val('');

      app.sendMsg(message);
    },

    renderMessage: function(message){
      var $user = $("<div>", {class: 'user'}).text(message.username);
      var $text = $("<div>", {class: 'text'}).text(message.text);
      var $message = $("<div>", {class: 'chat', 'data-id': message.objectId }).append($user, $text);
      return $message;
    },

    displayMessage: function(message){
      if( app.blockedUsers.indexOf(message.username) < 0 ){
        if( !app.onscreenMessages[message.objectId] ){
          var $html = app.renderMessage(message);
          $('#chats').prepend($html);
          app.onscreenMessages[message.objectId] = true;
        }
      }
    },

    displayMessages: function(messages){
      for( var i = 0; i < messages.length; i++ ){
        app.displayMessage(messages[i]);
      }
    },

    loadMsgs: function(){
      $.ajax({
        url: app.server + '/messages',
        contentType: 'application/json',
        success: function(json){
          app.displayMessages(json.results);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    sendMsg: function(message){
      app.startSpinner();
      $.ajax({
        type: 'POST',
        url: app.server + '/messages',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(json){
          message.objectId = json.objectId;
          app.displayMessage(message);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    startSpinner: function(){
      $('.spinner img').show();
      $('form input[type=submit]').attr('disabled', "true");
    },

    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
      $('form input[type=submit]').attr('disabled', null);
    }
};
