const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: ObjectId,
        ref: 'Brand',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
        required: true
    }],
    color: {
        type: String,
        required: true
    },
    rating: [{
        star: Number,
        comment: String,
        postedBy: {type: ObjectId, ref: 'User'}
    }],
    totalratings: {
        type: Number,
        default:0
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);