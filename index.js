var express = require('express');
var app = express();

var WEBHOOK_URL = process.env.MY_SLACK_WEBHOOK_URL;
Slack = require('node-slackr');
slack = new Slack(WEBHOOK_URL,{
  channel: "#pointbot-testing",
  username: "point-bot",
  icon_emoji: ":robot_face:"
});

var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

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


var client = new pg.Client(connectionString);
client.connect();
var query = client.query(
  "CREATE TABLE IF NOT EXISTS interns (" + 
    "name varchar(45) NOT NULL, " +     
    "points integer NOT NULL DEFAULT '0', " + 
    "PRIMARY KEY (interns_id) " + 
  ")"
);
query.on('end', function() { client.end(); });
