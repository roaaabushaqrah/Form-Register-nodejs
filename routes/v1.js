const express= require('express');
const router= express.Router();
const userController=require('../backend/Controllers/users.controller');
router.post('/register',userController.register);

module.exports=router;

