const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String },
    mail: { type: String },
    password: { type: String },
    picturs:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Picture'
    }]
})
module.exports = mongoose.model('User', UserSchema)