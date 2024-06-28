const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    ucreatedat:{type: Date, required: true},
    umodifiedat:{type: Date, required: true}
});

user.pre('save',async function(next){
    const u = this;
    if(u.isModified('password')){
        u.password = await bcrypt.hash(u.password,10);
    }
    next();
})

user.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('User',user);