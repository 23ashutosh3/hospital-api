const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/Report');

router.get('/:status',passport.authenticate("jwt",{session:false}),usersController.patientStatus);

router.get('/',usersController.Allreport);
module.exports = router; 