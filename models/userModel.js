const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var ObjectId = mongoose.Schema.ObjectId;
const crypto = require('crypto')


var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role:{                                    
        type: String,
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: ObjectId, 
        ref: 'Address'
    },
    wishlist: {
        type: [ObjectId],
        ref: 'Product'
    },
    refreshToken: {
        type: String
    },
    passWordChangedAt: Date,
    passWordResetToken: String,
    passWordResetExpires: Date
},
{
    timestamps: true,  
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSaltSync(10); 
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){ 
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.createResetPassWorkToken = async function(enteredPassword){ 
    const resetToken = crypto.randomBytes(32).toString('hex');  
    this.passWordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    this.passWordResetExpires = Date.now()+5*60*1000;
    return resetToken;
}


module.exports = mongoose.model('User', userSchema);

