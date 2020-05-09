const express = require('express');
const router = express.Router();
const passportLocal=require('../config/passport_jwt_strategy')

const usersController = require('../controllers/Patient');

router.post('/register', usersController.register);

router.get('/', usersController.AllPatient);

module.exports = router;