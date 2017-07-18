var express = require('express');
var app = express();

// load the mysql library
var mysql = require('promise-mysql');
// create a connection to our Cloud9 server
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'benbeatty85', // CHANGE THIS :)
    password : '',
    database: 'reddit',
    connectionLimit: 10
});
// load our API and pass it the connection
var RedditAPI = require('./reddit');
var myReddit = new RedditAPI(connection);




//Exercise 2

app.get('/hello', function (req, res) {
  var name = req.query.name;
  
  if (name) {
    res.send('<h1> Hello ' + name + '!</h1>');
  } else {
    res.send('<h1>Hello World!</h1>');
  }
});


//Exercise 3

// Below is how to use the calculator in the link
// https://reddit-nodejs-project-benbeatty85.c9users.io/calculator/add?num1=3&num2=5
// https://reddit-nodejs-project-benbeatty85.c9users.io/calculator/multiply?num1=3&num2=5

app.get('/calculator/:operation', function (req, res) {
  
  var num1 = 0;
  var num2 = 0;
  if (req.query.num1 !== undefined) {
    num1 = Number(req.query.num1);
  }
   
  if (req.query.num2 !== undefined) {
    num2 = Number(req.query.num2);
  }
   
  var newOp = req.params.operation;  //newOp is "new operation"
  var solution;
   
  if (newOp == "add") {
    solution = num1 + num2;
  } else if (newOp == "multiply") {
    solution = num1 * num2;
  } else {
    res.status(400).send("Error 400: This was a bad request!");
  }
   
     
    var newOpObject = {
      "operation": newOp,
      "firstOperand": num1,
      "secondOperand": num2,
      "solution": solution
    };
     
    res.end(JSON.stringify(newOpObject)); 
});


//Exercise 4

app.get('/posts', function (req, res) {
  //call getAllPosts, then start the list, then do a forEach where you 
  //display each li, then close the ul. 
var myReddit = new RedditAPI(connection);  
var postList = 
  `<!DOCTYPE html>
    <body>
      <div id="posts">
          <h1>List of posts</h1>
          <ul class="posts-list">`;
myReddit.getAllPosts()
.then (function(posts) {
    posts.forEach(function(post) {
     postList = postList + 
    `<li class="post-item">
      <h2 class="post-item__title">
        <a href=` + `" `+ posts.url + `"` + `>` + posts.title + `</a>
      </h2>
      <p>Created by `+ posts.user.username + `</p>
     </li>`;
    });
  })
.then(function(result) {
    res.send(
      postList = postList + 
    ` </ul>
    </div>
    </body>
    </html>`
    );
  });
});


//Exercise 5

app.get('/new-post', function (req, res) {
  res.send(`
  <form action="/createPost" method="POST"><!-- why does it say method="POST" ?? -->
  <p>
    <input type="text" name="url" placeholder="Enter a URL to content">
  </p>
  <p>
    <input type="text" name="title" placeholder="Enter the title of your content">
  </p>
  <button type="submit">Create!</button>
</form>`
  );
});

//Exercise 6




  






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s:'+process.env.PORT, process.env.C9_HOSTNAME);
});

