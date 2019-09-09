const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const authenticate = require('./authenticate');

//Connect to DB
const url = 'mongodb://localhost:27017/hcs';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

//Initialize express
const app = express();
const port = 3001;

//CORS Policy
app.use(cors());

// BodyParser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Session Secret and Session Store
app.use(session({
    name: 'session_id',
    secret: "MySuperSecretString",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", userRouter);
// app.use(auth);

app.get('/', (req, res) => {
    console.log(req.user);
    console.log(req.session.user);
    res.send("Main Page");
});

function auth(req, res, next) {
    if(!req.user) {
        var err = new Error('Access Denied!');
        // res.setHeader('WWW-Authenticate', 'Basic');                          
        err.status = 403;
        next(err)
    } else {
        next();
    }
}


app.listen(port, () => console.log("The server is running on port " + port));