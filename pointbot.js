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

function execute(){
  var action = _.find(api, function(command){
    var truncatedTokens = _.slice(tokens, 0, command.pattern.length);
    return _.isEqual(truncatedTokens, command.pattern);
  });

  if(action) {
    var params = _.slice(tokens, action.pattern.length, tokens.length);
    action.storage.apply(this, params);
    return "Action successfully executed."
  } else {
    return "ERROR: No such action to execute."
  }
}

function tokenize(string){
	tokens = string.split(' ');
}

function formatList(interns){
  var list = 'POINTS\n';
  _.forEach(interns, function(intern){
    list += intern.name + ': ' + intern.points + '\n';
  });
  return list;
}


module.exports = {
	response: function(string){
		tokenize(string);
    console.log(tokens);
    return execute();
	},
  formatList: formatList,
}
