const mongoose = require('../db/mongoose');
const validator = require('validator');

const connectionUrl = 'mongodb://localhost:27017/task-manager-api';


const User = mongoose.model('User',{
    name :{
        type: String,
        required : true
    },
    age: {
        type: Number
    },
    email : {
        type: String,
        require : true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Invalid Email');
        }
    },
    password : {
        require : true,
        type: String,
        trim: true,
        validate(value) {
           if (value.toLowerCase().includes('password')) {
               throw new Error('password: Must not contain the word password');
           }
        }
    
    }
});


module.exports = User;
