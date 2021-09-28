const express = require('express');
const app = express();
const cors = require("cors");

const passport = require('passport');
const session = require('express-session')
app.use(express.json());

const facebookStrategy = require('passport-facebook').Strategy


// Google OAuth Routes

// Zoom OAuth Routes
const ZoomRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomRoute);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Routes

// Zoom OAuth Routes
const ZoomRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomRoute);

// Facebook OAuth Routes

// GitHub OAuth Routes

app.listen('5000', () => {
    console.log("🚀 Server started on port 5000");
});

passport.use(new facebookStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:5000/auth/facebook/secrets"
},
    function (token, refreshToken, profile, done) {
        console.log("HELLLO")
        console.log("TOKEN", token)
        console.log("TOKEN refreshToken", refreshToken)
        console.log("TOKEN refreshToken", done)
        console.log("TOKEN refreshToken", profile)
    }))

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/secrets', passport.authenticate('facebook', {successRedirect:'/profile', failaureRedirect:'/failed'}))

app.get('/profile', (req, res) => {
    console.log("EFOIJEFOIJE")
    res.send("YOU ARE A VALID USER")
})

app.get('/failed', (req, res) => {
    console.log("ssssssssssssss")
    res.send("YOU ARE A NOT VALID USER")
})

passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (id, done) {
    return done(null, id)
})
app.listen(5000,(err)=>{
    if (err){
        console.error(err)
    }
    console.log(`Connected to port ${5000}`)
});
