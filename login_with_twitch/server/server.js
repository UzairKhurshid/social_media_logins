require('./db/index')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const hbs=require('hbs')
const passport=require('passport')
var twitchStrategy = require("passport-twitch").Strategy;
const app=express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const viewsDirectory=path.join(__dirname,'../views')

app.set('view engine', 'hbs'); 
app.set('views',viewsDirectory)


let TWITCH_CLIENT_ID="q4rh9h14tg61xe63cdy2v00ngxs11y";
let TWITCH_CLIENT_SECRET="a8rqah8wrrqjj62lpotibu8onxn4dy";
passport.use(new twitchStrategy({
  clientID: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  callbackURL: "https://www.finesols.com/auth/callback",
  scope: "user_read"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ twitchId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));


app.get("/auth/twitch", passport.authenticate("twitch"));
app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});

passport.serializeUser(function(user,done){
  done(null,user)
})
passport.deserializeUser(function(id,done){
  done("something went wrong",user)
})

const userRoute=require('./routes/index')
app.use(userRoute)

app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})