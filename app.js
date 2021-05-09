var dotenv =  require('dotenv')
dotenv.config()
var express = require( "express");
var morgan = require( "morgan");
var bodyParser = require( "body-parser");
var expressValidator = require("express-validator");
// var db = require( "./src/db");
// const auth = require("./src/middleware/auth").default;
const port = process.env.PORT || 9004;
const path = require("path");
// var forceSsl = require('express-force-ssl');
// const fs = require('fs');
var minify = require('express-minify');
var compression = require('compression');
// const https = require('https');
var http = require('http');

const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const MongoStore = new connectMongo(session);
const { mongoose } = require('./src/db');
let passport = require('passport');
require('./src/middleware/passport')(passport);



const env = process.env.NODE_ENV;


const app = express();
module.exports = app;


app.use(morgan(env));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//user-session
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        client: mongoose.connection.client
    }),
    cookie: { maxAge: 60 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());


app.all(process.env.API_BASE + "*", (req, res, next) => {
    //to protect api base from unauthenticated calls
    if(!req.user){
        return res.status(400).json({
            message: "Authentication error"
        });
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ui/build')));


app.get("*", (req, res) => {
    var appDir = path.dirname(require.main.filename);
    return res.sendFile(path.join(appDir+'/ui/build/index.html'), {user: req.user && req.user.id});
})
require("./src/routes")(app);

if(env && (env == "production" || env == "PRODUCTION")){
    //in case you want to enable ssl uncomment the commented code
    // app.set('forceSSLOptions', {
    //     enable301Redirects: true,
    //     trustXFPHeader: false,
    //     httpsPort: 443,
    //     sslRequiredMessage: 'SSL Required.'
    // });
    // app.use(forceSsl);
    app.use(compression());
    app.use(minify());

    // var https_options = {
    //     key: fs.readFileSync(path.join(__dirname, 'ssl/private.key')),
    //     cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.crt')),
    //     ca: fs.readFileSync(path.join(__dirname, 'ssl/ca_bundle.crt')),
    //     secure: true
    // };
    // https.createServer(https_options, app).listen(443, () => {
    //     console.log(`working on port ${443}`);
    // });
    http.createServer(app).listen(80);
}else{
    app.listen(port,function(){
        console.log(`Working on port ${port}`);
    });
}