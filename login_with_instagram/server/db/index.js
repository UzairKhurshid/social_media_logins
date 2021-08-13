const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/login_with_instagram", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("successfully connected to db")
}).catch((err)=>{
    console.log('err>>',err.message)
    console.log("Error connecting db")
});