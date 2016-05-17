var storage = require("./storage.js");
var _ = require('lodash');

var tokens;
var pw = { admin: 'daav', users: 'tw' };

var api = [
  {'storage': storage.admin.interns.add,
   'pattern': [pw.admin, 'interns', 'add']},
  {'storage': storage.admin.interns.drop, 
   'pattern': [pw.admin, 'interns', 'drop']},
  {'storage': storage.admin.interns.megadrop, 
   'pattern': [pw.admin, 'interns', 'megadrop']},
  {'storage': storage.admin.interns.message, 
   'pattern': [pw.admin, 'interns', 'message']},

  {'storage': storage.admin.users.list, 
   'pattern': [pw.admin, 'users', 'list']},
  {'storage': storage.admin.users.add, 
   'pattern': [pw.admin, 'users', 'add']},
  {'storage': storage.admin.users.drop, 
   'pattern': [pw.admin, 'users', 'drop']},
  {'storage': storage.admin.users.megadrop, 
   'pattern': [pw.admin, 'users', 'megadrop']},
  {'storage': storage.admin.users.response, 
   'pattern': [pw.admin, 'users', 'response']},
  {'storage': storage.admin.users.message, 
   'pattern': [pw.admin, 'users', 'message']},

  {'storage' : storage.users.give, 
   'pattern': [pw.users, 'give']},
  {'storage' : storage.users.take, 
   'pattern': [pw.users, 'take']},

  {'storage' : storage.anyone.list,
   'pattern': ['list']},
]

function execute(action){
  var command = _.find(api, function(command){
    return _.isEqual(action, command.pattern);
  });
  var params = _.slice(tokens, command.pattern.length, tokens.length)
  command.storage.call(this, params);
}

function tokenize(string){
	tokens = string.split(' ');
}


module.exports = {
	response: function(string){
		tokenize(string);
    execute(tokens);
	}
}
