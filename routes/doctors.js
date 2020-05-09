const express = require('express');
const router = express.Router();
const passportLocal=require('../config/passport_jwt_strategy')

const usersController = require('../controllers/Doctor');

router.post('/login',usersController.login)
router.post('/register', usersController.register);

module.exports = router;