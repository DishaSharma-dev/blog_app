var express = require("express");
var routes = require("./src/routes/routes"); 
var root = express();
var bodyParser = require('body-parser');
var cors = require('cors')

root.use(bodyParser.json());
root.use(bodyParser.urlencoded({extended : true}));
root.use(cors())

require("dotenv").config();

root.use('/api/blogPost/', routes);


root.set("views", "./views");

let port = process.env.PORT;

root.listen(port, () => {
    console.log("Server is running");
});