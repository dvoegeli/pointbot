var express = require('express');
var app = express();

var WEBHOOK_URL = process.env.MY_SLACK_WEBHOOK_URL;
Slack = require('node-slackr');
slack = new Slack(WEBHOOK_URL,{
  channel: "#pointbot-testing",
  username: "point-bot",
  icon_emoji: ":robot_face:"
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/', function(request, response) {
  response.send({
    "response_type": "ephemeral",
    "text": "Here are the currently open tickets:",
  });
  slack.notify("Message"); //without callback
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


