const User = require('../modelles/user')
const jwt=require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        console.log("got in create user")
        const token=jwt.sign({name:req.body.name},process.env.SECRET)
        const check=await User.findOne({mail:req.body.mail})
        console.log(req.body.name)
        if(check){
            res.status(200).json({message:" the email is exiest ",isIn:true})
        }
      else{
        const user = new User(req.body)
        console.log(user)
        await user.save()
        res.status(200).json({ messag: "User saved",isIn:false,token})
    }
    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }

}
const getUserByMail = async (req, res) => {
    try {

        const user = await User.findOne({mail:req.params.mail})
        const token=jwt.sign({name:user.name},process.env.SECRET)
        res.status(200).json({user,token})
    } catch (error) {
        console.log(error)
        res.status(200).send(error)
    }
}

// const  = async (req, res) => {
//     try {

//         // const user = await User.findOne({mail:req.params.mail})
//         res.status(200).json("user")
//     } catch (error) {
//         console.log(error)
//         res.status(200).send(error)
//     }
// }

module.exports ={createUser,getUserByMail}

