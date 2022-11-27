// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

//Imports
var async = require('async');
var mysql = require('mysql');
var ansQuery = require('./db/Answer.js');
var questionQuery = require('./db/Question.js');
var tagQuery = require('./db/Tag.js');
var userQuery = require('./db/User.js');
var commentQuery = require('./db/Comment.js');
var bcrypt = require('bcrypt');

//Argument Handling:
let userArgs = process.argv.slice(2);
if (userArgs.length == 0) {
  console.log('missing arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if (userArgs.length != 4) {
  console.log('Bad arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
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

//If arguments are fine, we can set them as variables.
user = userArgs[1];
pass = userArgs[3];

var connection = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: pass,
  database: 'fake_so'
});

connection.connect();

const http = require('http')
const bodyParser = require('body-parser')
const express = require("express")
const cors = require('cors');
const res = require('express/lib/response');
const tags = require('../../cse316-hw3-bryanlais/server/models/tags.js');
const { resolveSoa } = require('dns');
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
const app = express()
const server = http.createServer(app)
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
server.listen(8000, () => {
  console.log(`Example app listening on 
     ${8000}`);
  console.log('Server ready!');
})

//All Questions
app.get('/allquestions', (req, res) => {
  questionQuery.get_all_questions_info(connection).then(result => {
    res.send(result);
  });
});

app.get('/axiosqt', (req, res) => {
  questionQuery.get_qt(connection).then(result => {
    res.send(result);
  });
});

app.get('/axiosqa', (req, res) => {
  questionQuery.get_qa(connection).then(result => {
    res.send(result);
  });
});

app.get('/axiosqc', (req, res) => {
  questionQuery.get_qc(connection).then(result => {
    res.send(result);
  });
});

app.get('/alltags', (req, res) => {
  tagQuery.get_all_tags_info(connection).then(result => {
    res.send(result);
  })
})

app.get('/allcomments', (req, res) => {
  commentQuery.get_all_comments_info(connection).then(result => {
    res.send(result);
  })
})

app.get('/allanswers', (req, res) => {
  ansQuery.get_all_answers_info(connection).then(result => {
    res.send(result);
  });
});

app.get('/allusers', (req, res) => {
  userQuery.get_all_users_info(connection).then(result => {
    res.send(result);
  })
})

app.post('/login', async (req, res) => {
  userQuery.get_all_users_info(connection).then(users => {
    if(users.length == 0){
      res.send("0");
    }
    for (let u = 0; u < users.length; u++) {
      if((users[u].email.localeCompare(req.body.email) == 0)){
        bcrypt.compare(req.body.password, users[u].password, function(err, result){
          if(err) {return err}
          console.log("Status: " + result);
          if(result) {
            res.send(users[u])
            return;
          }
          else{
            res.send("0"); //Send 0 if the user does not exist.
            return;
          }
        })
        break;
      }
      else if(u == users.length - 1){
        res.send("0");
        break;
      } 
    }
  })
});

app.post('/inserttag', async (req, res) => {
  tagQuery.insertTag(connection, req.body);
});

app.post('/edittag', async(req, res) => {
  tagQuery.editTag(connection,req.body);
})

app.post('/deletetag', async (req, res) => {
  tagQuery.deleteTag(connection, req.body);
});

app.post('/insertquestion', async (req, res) => {
  console.log("Question data: " + req.body);
  questionQuery.insertQuestion(connection, req.body);
});

app.post('/editquestion', async(req, res) => {
  questionQuery.editQuestion(connection,req.body);
})

app.post('/deletequestion', async (req, res) => {
  questionQuery.deleteQuestion(connection, req.body);
});

app.post('/insertcomment', async (req, res) => {
  commentQuery.insertComment(connection, req.body);
});

app.post('/insertqc', async (req, res) => {
  commentQuery.insertQC(connection, req.body);
})

app.post('/insertac', async (req, res) => {
  commentQuery.insertAC(connection, req.body);
})

app.post('/insertanswer', async (req, res) => {
  ansQuery.insertAnswer(connection, req.body);
});

app.post('/editanswer', async(req, res) => {
  ansQuery.editAnswer(connection,req.body);
})

app.post('/deleteanswer', async (req, res) => {
  ansQuery.deleteAnswer(connection, req.body);
})

app.post('/insertuser', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  userQuery.insertUser(connection, req.body);
})

app.post('/insertqt', async (req, res) => {
  questionQuery.insertQT(connection, req.body);
});

app.post('/insertqa', async (req, res) => {
  questionQuery.insertQA(connection, req.body);
});

app.post('/increaseviews', async (req, res) => {
  questionQuery.increase_views(connection, req.body.qid);
});

