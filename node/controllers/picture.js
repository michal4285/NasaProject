const Picture = require('../modelles/picture')
const User = require('../modelles/user')

const createPicture = async (req, res) => {
    try {
        let new_picture;
        console.log(' in create picture', req.body)
        const user = await User.findOne({ mail: req.params.mail }).populate({ path: 'picturs', match: { url: req.body.url } })
        console.log(user)
        if (user.picturs[0]) {
            console.log("there is a pic")
            const pic = await Picture.findById(user.picturs[0]._id)
            const num1 = pic.num + 1
            new_picture = await Picture.findByIdAndUpdate(pic._id, { num: num1 }, { new: true })
            res.status(200).json({ message: 'upDate user:', picture: new_picture })

        }
        else {
            // const newP = new Picture({ date: req.body.date, explanation: req.body.explanation, media_type: req.body.media_type, service_version: req.body.service_version, title: req.body.title, url: req.body.url, num: req.body.num,isUsers:req.body.isUsers,user: user._id });
            const newP = new Picture(req.body)
            newP.user = user._id
            console.log("there no a pic")
            console.log(req.body)
            new_picture = await newP.save();
            console.log('newPicture::::', new_picture)
            user.picturs.push(new_picture._id)
            await user.save();
            console.log("saved")
            res.status(200).json({ message: 'created picture:', picture: new_picture })
        }
    } catch (error) {
        console.log(' error in create picture')
        console.log(error)
        res.status(500).send(error)
    }
}

const getPicturs = async (req, res) => {
    try {
        console.log('in get picturs')
        const picturs = await User.findOne({ mail: req.params.mail }).populate({ path: 'picturs', match: { isUsers: false } })
        res.status(200).json(picturs.picturs)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getPictursUser = async (req, res) => {
    try {
        console.log('in get picturs')
        const picturs = await User.findOne({ mail: req.params.mail }).populate({ path: 'picturs', match: { isUsers: true } })
        res.status(200).json(picturs.picturs)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createPicture, getPicturs, getPictursUser }