var express = require('express');
var app = express();

// app.get('/hello', function (req, res) {
//   var name = req.query.name;
  
//   if (name) {
//     res.send('<h1> Hello ' + name + '!</h1>');
//   } else {
//     res.send('<h1>Hello World!</h1>');
//   }
// });

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
     
    res.end(JSON.stringify(newOpObject, null, 2));
});
  






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s:'+process.env.PORT, process.env.C9_HOSTNAME);
});

