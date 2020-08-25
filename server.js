const express = require('express')
const server = express();
const PORT = process.env.PORT||5000;
const emailRoute = require('./api/routes/email');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
server.use(express.json())
mongoose.set('useFindAndModify', false);
const uri = "mongodb+srv://valeffe1109:Vergine97@cluster0.zv9ag.mongodb.net/Cluster0?retryWrites=true&w=majority";
server.use('/email',emailRoute)


mongoose.connect(uri , { useNewUrlParser: true,useUnifiedTopology: true })  


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


module.exports = server;