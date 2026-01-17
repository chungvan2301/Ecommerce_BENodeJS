const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId; 
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    countView:{                             
        type:Number,
        default:0,
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    dislikes: {
        type: [ObjectId],
        ref: 'User'
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    },
},{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);