const mongoose = require('mongoose')
const User = require('./user')

const pictureSchema = mongoose.Schema({
    date: { type: String },
    explanation: { type: String },
    media_type: { type: String },
    service_version: { type: String },
    title: { type: String },
    url: { type: String, required: true },
    num: { type: Number, default: 1 },
    isUsers: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }


})
// pictureSchema.post('save', async function (next) {

//     await User.findByIdAndUpdate(this.user, { $push: { picturs: this._id } })
//     console.log("pre")
//     return next()
// })
module.exports = mongoose.model('Picture', pictureSchema)
