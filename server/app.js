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
app.use(cors({
    origin: "http://localhost:3000"
    // credentials: true
}));

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

app.get('/', (req, res, next) => {
    console.log(req.cookies);
    console.log(req.user);
    console.log(req.session);
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if(!req.user) {
        err = new Error("Unauthenticated request");
        res.status(403);
        next(err);
    } else {
        res.send(req.user);
    }
    
});

app.listen(port, () => console.log("The server is running on port " + port));