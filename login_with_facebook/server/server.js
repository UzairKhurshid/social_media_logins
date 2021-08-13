require('./db/index')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const hbs=require('hbs')
const passport=require('passport')
const FacebookStrategy=require('passport-facebook').Strategy;

const app=express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const viewsDirectory=path.join(__dirname,'../views')

app.set('view engine', 'hbs'); 
app.set('views',viewsDirectory)


let FACEBOOK_APP_ID="342129944314056";
let FACEBOOK_APP_SECRET="404895213029fb8d03757c867b86caa8";
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    cb(null,profile)
  }
));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect:'/', failureRedirect: '/login' })  );
   

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