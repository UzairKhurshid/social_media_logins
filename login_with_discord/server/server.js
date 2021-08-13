require('./db/index')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const hbs=require('hbs')
const passport=require('passport')
var DiscordStrategy = require('passport-discord').Strategy;
const app=express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const viewsDirectory=path.join(__dirname,'../views')

app.set('view engine', 'hbs'); 
app.set('views',viewsDirectory)


let DISCORD_ID="875636983932801024";
let DISCORD_SECRET="FfyDNPUnQnHKvXsDjzsm4gIjpR8uRBed";
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    callbackURL: 'http://localhost:3000/auth/discord/callback',
    scope: scopes
},
function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));


app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/login'
}), function(req, res) {
    console.log('here......')
    res.redirect('/') // Successful auth
});

passport.serializeUser(function(user,done){
  done(null,user)
})
passport.deserializeUser(function(id,done){
  done("something went wrong",id)
})

const userRoute=require('./routes/index')
app.use(userRoute)

app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})