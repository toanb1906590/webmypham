const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
        unique:true,
    },
    numberViews:{
        type:Number,
        required:false,
    },
    likes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image:{
        type: String,
        default: 'https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?size=626&ext=jpg&ga=GA1.1.1930204137.1708732800&semt=ais'
    },
    author:{
        type:String,
        default: 'admin'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);