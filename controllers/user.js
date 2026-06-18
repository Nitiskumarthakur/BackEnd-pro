const User = require('../models/user.js');
// const {saveRedirectUrl} = require("../middleware.js");
// const passport = require('passport');

module.exports.singupForm = (req,res)=>{
    res.render("users/singup.ejs");
}

module.exports.singupPost = async (req,res,next)=>{
    try{
        let {username, password, email} = req.body;
        const newUser = new User({
           username,
           email,
        });
        let registerUser = await User.register(newUser, password);
        //console.log(registerUser)
        req.login(registerUser, function(err) {
           if (err) { 
              return next(err); 
            }
            req.flash("success", "Register successfully.")
            return res.redirect('/listing');
        });      
    }catch(e){
        req.flash("error", `${e.message}, try again.`);
        res.redirect('/user/singup');
    };
};

module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginPost = 
    
    async(req,res)=>{
    req.flash("success","welcome Back to wanderlist page!");
    let rediretURL = res.locals.redirectUrl || "/listing";
    res.redirect(rediretURL);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listing");
    })
};