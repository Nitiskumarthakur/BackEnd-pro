const express = require("express");
const router = express.Router();

const passport = require('passport');
const {saveRedirectUrl} = require("../middleware.js");

const userControllers = require("../controllers/user.js");

router.get("/singup",userControllers.singupForm );

router.post('/singup', userControllers.singupPost);
//-------Login page.-------
router.get("/login", userControllers.loginForm);

router.post('/login',saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash:true,
        failureRedirect:('login'),
    }),userControllers.loginPost
);

//----Logout---
router.get('/logout',userControllers.logOut);


module.exports= router;