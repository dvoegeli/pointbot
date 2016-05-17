var pointbot = require("./pointbot.js");

var WEBHOOK_URL = process.env.MY_SLACK_WEBHOOK_URL;
Slack = require('node-slackr');
slack = new Slack(WEBHOOK_URL,{
  channel: "#pointbot-testing",
  username: "point-bot",
  icon_emoji: ":robot_face:"
});


var conString = process.env.DATABASE_URL;
conString += "?ssl=true";

module.exports = {
  admin: {
    init: {
      interns: function() {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "CREATE TABLE IF NOT EXISTS interns"+
          "("+
            "name varchar(45) NOT NULL,"+
            "points integer NOT NULL DEFAULT '0',"+
            "response text DEFAULT ''"+
          ")"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Interns Schema Initialized');
        });
      },
      users: function() {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "CREATE TABLE IF NOT EXISTS users"+
          "("+
            "name varchar(45) NOT NULL,"+
            "award text DEFAULT '',"+
            "response text DEFAULT ''"+
          ")"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Users Schema Initialized');
        });
      },
    },
    interns: {
      add: function(name) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "INSERT INTO interns (name,points) " +
          "VALUES ('" + name + "','" + 0 + "')"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Added Intern ' + name);
        });
      },
      drop: function(name) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("DELETE FROM interns WHERE name= '" + name + "'"); 
        query.on("end", function(result) {
          client.end();
          console.log('Dropped Intern ' + name);
        });
      },
      megadrop: function() {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("DELETE FROM interns");
        query.on("end", function(result) {
          client.end();
          console.log('Dropped Every Intern');
        });
      },
      response: function(name, response) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("UPDATE interns SET response = '" + response + "' WHERE name = '" + name + "'");
        query.on("end", function(result) {
          client.end();
          console.log('Added Response for Intern ' + name);
        });
      },
    },
    users: {
      list: function(){
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("SELECT * FROM users");
        query.on("row", function(row, result) {
          result.addRow(row);
        });
        query.on("end", function(result) {
          client.end();
          console.log(JSON.stringify(result.rows, null, "  ") + "\n");
        });
      },
      add: function(name) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "INSERT INTO users (name) " +
          "VALUES ('" + name + "')"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Added User ' + name);
        });
      },
      drop: function(name) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("DELETE FROM users WHERE name=" + name);
        query.on("end", function(result) {
          client.end();
          console.log('Dropped User ' + name);
        });
      },
      megadrop: function() {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("DELETE FROM users");
        query.on("end", function(result) {
          client.end();
          console.log('Dropped Every User');
        });
      },
      response: function(name, response) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "UPDATE users SET response = '" + response + "' WHERE name = '" + name + "'"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Added Response for User ' + name);
        });
      },
      award: function(name, award) {
        var pg = require('pg');
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query(
          "UPDATE users SET award = '" + award + "' WHERE name = '" + name + "'"
        );
        query.on("end", function(result) {
          client.end();
          console.log('Added Award Message for User ' + name);
        });
      },
    },
  },
  users: {
    give: function(name, points) {
      console.log(name + ', ' + points)
      var pg = require('pg');
      var client = new pg.Client(conString);
      client.connect();
      var query = client.query(
        "UPDATE interns SET points = points + " + points + " WHERE name = '" + name + "'"
      );
      query.on("end", function(result) {
        client.end();
        console.log('Gave Intern Points for ' + name);
      });
    },
    take: function(name, points) {
      var pg = require('pg');
      var client = new pg.Client(conString);
      client.connect();
      var query = client.query(
        "UPDATE interns SET points = points - " + points + " WHERE name = '" + name + "'"
      );
      query.on("end", function(result) {
        client.end();
        console.log('Took Intern Points for ' + name);
      });
    },
    reset: function(name) {
      var pg = require('pg');
      var client = new pg.Client(conString);
      client.connect();
      var query = client.query(
        "UPDATE interns SET points = 0 WHERE name = '" + name + "'"
      );
      query.on("end", function(result) {
        client.end();
        console.log('Took Intern Points for ' + name);
      });
    },
    megareset: function(name) {
      var pg = require('pg');
      var client = new pg.Client(conString);
      client.connect();
      var query = client.query(
        "UPDATE interns SET points = 0"
      );
      query.on("end", function(result) {
        client.end();
        console.log('Took Every Interns Points');
      });
    },
  },
  anyone: {
    list: function(){
      var pg = require('pg');
      var client = new pg.Client(conString);
      client.connect();
      var query = client.query("SELECT * FROM interns");
      query.on("row", function(row, result) {
        result.addRow(row);
      });
      query.on("end", function(result) {
        client.end();
        console.log(JSON.stringify(result.rows, null, "  ") + "\n");
        slack.notify(JSON.stringify(result.rows, null, "  "))
      });
    }
  }
};
