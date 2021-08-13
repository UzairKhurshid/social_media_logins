//toturial link
//https://medium.com/crowdbotics/add-instagram-login-to-your-nodejs-app-using-passportjs-be7e8e31efb8

require('./db/index')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const hbs=require('hbs')
const passport=require('passport')
var Instagram = require('passport-instagram');
const InstagramStrategy = Instagram.Strategy;

const app=express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const viewsDirectory=path.join(__dirname,'../views')

app.set('view engine', 'hbs'); 
app.set('views',viewsDirectory)


let INSTAGRAM_APP_ID="342129944314056";
let INSTAGRAM_APP_SECRET="404895213029fb8d03757c867b86caa8";
passport.use(new InstagramStrategy({
  clientID: INSTAGRAM_APP_ID,
  clientSecret: INSTAGRAM_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/instagram/callback"
}, (accessToken, refreshToken, profile, done) => {
  //perform your database logic here   
  // console.log(profile)
    return done(null, profile);
}))

app.get('/auth/instagram', passport.authenticate('instagram'));
app.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

const userRoute=require('./routes/index')
app.use(userRoute)

app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})