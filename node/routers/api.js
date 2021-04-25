const router=require('express').Router()
const picture=require('../controllers/picture')
const user=require('../controllers/user')
 
router.post('/api/createUser',user.createUser)
router.get('/api/getUserByMail/:mail',user.getUserByMail)
 

router.post('/createPicture/:mail',picture.createPicture)
router.get('/getPicturs/:mail',picture.getPicturs)
router.get('/getPictursUser/:mail',picture.getPictursUser)
module.exports=router