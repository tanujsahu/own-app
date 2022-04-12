var express = require('express');
//var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var config = require('./config');
const numCPUs = 1// require('os').cpus().length;
var app = express();

const useragent = require('express-useragent');
app.use(useragent.express());
app.use(express.static(__dirname + '/ui/dist'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/ui/src/environments'));
const cluster = require('cluster');
var bodyParserJSON = bodyParser.json({ limit: '50mb' });
var bodyParserURLEncoded = bodyParser.urlencoded({ limit: '50mb', extended: true });
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

var cors = require('cors');
// var corsOptions = { //------------ block 
//     origin: 'http://localhost:5100',
//     optionsSuccessStatus: 200 // For legacy browser support
// } 
app.use(cors());
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



//------------------------------------------------------------------ use express router
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

require("./routes/reg.route.js")(app);
require("./routes/user.js")(app);
require("./routes/task.js")(app);
require("./routes/event.js")(app);
require("./routes/query")(app);

if (cluster.isMaster) {
    console.log(`Master O ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); //------------------------------------------------------------- Create a New Worker, If Worker is Dead
    });
} else {
    app.listen(config.serverPort, config.host, function () {
        console.log("Express server listening on port " + config.serverPort + " as Worker " + cluster.worker.id + " running @ process " + cluster.worker.process.pid + "!");
    });
}

module.exports = app;