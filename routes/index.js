
const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');


router.get('/',homeController.home);

router.use('/doctors',require('./doctors'));

router.use('/patients',require('./patients'));

module.exports =router;