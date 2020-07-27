const express = require('express');
const router = express.Router();
// const passportLocal=require('../config/passport_jwt_strategy')
const passport = require('passport');
const usersController = require('../controllers/Patient');


router.post('/register',passport.authenticate("jwt",{session:false}), usersController.register);
router.get('/', usersController.AllPatient);

// router.get('/one', usersController.patient);
 router.post('/:id/create_report',passport.authenticate("jwt",{session:false}),usersController.createReport);

   router.get('/:id/all_reports',usersController.all_reports);


 module.exports = router;

 

