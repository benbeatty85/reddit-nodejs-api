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


//Exercise 1

app.get('/hello', (req,res) => {
  res.send('<h1>Hello World!</h1>');
});


//Exercise 2


//hello?firstName=John&lastName=Smith

//How to encode special characters in console.log
//encodeURIComponent('hello='); 

app.get('/hello', function (req, res) {
  
  if (req.query.firstName && req.query.lastName) {
    res.send(`<h1>Hello ${req.query.firstName} ${req.query.lastName}</h1>`);
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

app.get('/posts', (req, res) => {
  var myReddit = new RedditAPI(connection);
  myReddit.getAllPosts()
  .then(posts => {
  
    
    var html = `
    <div id ="posts">
      <h1>List of posts</h1>
        <ul class = "posts-list">`;
        
        posts.forEach(post => {
          html += `
          <li>
            <h2>${post.title}</h2>
          </li>
          `
        });
        
        var postsHTMLString = html + `
                 </ul>
            </div>`;
    //console.log(html, " this is our list of posts");
    
    res.send(postsHTMLString);
  })
  .catch(err => {
    res.status(500).send(err.stack);
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

//middleware

//app.use((req, res, next) => {
//   console.log('a new requst comes in!' + req.url);
// next(); //move to the next middleware
// });

//npm install body-parser (for this question)
//var bodyParser = require('body-parser') (place ontop of page)

// app.post('/createPost', bodyParser.urlencoded({extended:false}), (req, res) => {
//   console.log(req.body);
//   res.send('thank you we got your request.');
// });


  






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s:'+process.env.PORT, process.env.C9_HOSTNAME);
});

