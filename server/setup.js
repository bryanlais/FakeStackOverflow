//MySQL Schema setup if using MySQL
var mysql = require('mysql');
const { TransformStreamDefaultController } = require('node:stream/web');
let userArgs = process.argv.slice(2);

if (userArgs.length == 0) {
  console.log('missing arguments');
  console.log('Correct Usage: node setup -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if (userArgs.length != 4) {
  console.log('Bad arguments');
  console.log('Correct Usage: node setup -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if (userArgs[0] != '-u') {
  console.log('username missing');
  return;
}

if (userArgs[2] != '-p') {
  console.log('password missing');
  return;
}

user = userArgs[1];
pass = userArgs[3];

var connection = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: pass,
  database: 'fake_so'
});

connection.connect(function (err) {
  console.log("Connected to setup MySQL Schema...");
  if (err) throw err;

  //DROP ALL CURRENT TABLES and RECREATE IT.
  let deleteQueries = ["DROP TABLE IF EXISTS question", "DROP TABLE IF EXISTS answer", "DROP TABLE IF EXISTS tag", "DROP TABLE IF EXISTS qt", "DROP TABLE IF EXISTS ac", "DROP TABLE IF EXISTS qc", "DROP TABLE IF EXISTS qa", "DROP TABLE IF EXISTS user", "DROP TABLE IF EXISTS comment"];
  for (let d = 0; d < deleteQueries.length; d++) {
    connection.query(deleteQueries[d], function (err, result) {
      if (err) throw err;
      if (d == 0) {
        console.log("====================================\nDeleting Tables in Database...\n====================================")
      }
      console.log("Query Used: " + deleteQueries[d]);
    })
  }

  //Create Tables.
  let question = "create table question (views integer DEFAULT 0, ask_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, asked_by varchar(15) DEFAULT 'Anonymous', qid integer PRIMARY KEY NOT NULL AUTO_INCREMENT, title varchar(100), text text)"
  let answer = "create table answer (ans_by varchar(15) DEFAULT 'Anonymous', aid integer PRIMARY KEY NOT NULL AUTO_INCREMENT, ans_date_time datetime DEFAULT CURRENT_TIMESTAMP, text text)"
  let tag = "create table tag(tid integer PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(255), created_by text)"
  let user = "create table user(username text, email text, password text, reputation integer DEFAULT 0, creation_time DATETIME DEFAULT CURRENT_TIMESTAMP, uid integer PRIMARY KEY NOT NULL AUTO_INCREMENT)"
  let comment = "create table comment(cid integer PRIMARY KEY NOT NULL AUTO_INCREMENT, text text, com_by text, com_date_time DATETIME DEFAULT CURRENT_TIMESTAMP)"
  let qa = "create table qa(qstnId integer, ansId integer)"
  let qt = "create table qt(qstnId integer, tagId integer)"
  let qc = "create table qc(qstnId integer, comId integer)"
  let ac = "create table ac(ansId integer, comId integer)"
  let createQueries = [question, answer, tag, user, comment, qt, qa, qc, ac];
  for (let c = 0; c < createQueries.length; c++) {
    connection.query(createQueries[c], function (err, result) {
      if (err) throw err;
      if (c == 0) {
        console.log("====================================\nCreating Tables in Database...\n====================================")
      }
      console.log("Query Used: " + createQueries[c]);
    })
  }

  /*Setup Foreign Keys.
  let foreignQueries = ["ALTER TABLE qa ADD FOREIGN KEY (qstnId) references question(qid)",
    "ALTER TABLE qa ADD FOREIGN KEY (ansId) references answer(aid)",
    "ALTER TABLE qt ADD FOREIGN KEY (qstnId) references question(qid)",
    "ALTER TABLE qt ADD FOREIGN KEY (tagId) references tag(tid)"
    ]
  for(let f = 0; f < foreignQueries.length; f++){
    connection.query(foreignQueries[f], function(err, result){
      if(err) throw err;
      if(f == 0){
        console.log("====================================\nCreating Foreign Keys in Database...\n====================================")
      }
      console.log("Query Used: " + foreignQueries[f]);
    })
  }
  */
});