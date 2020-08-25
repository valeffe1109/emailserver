const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
})

module.exports = mongoose.model('Customer',customerSchema);