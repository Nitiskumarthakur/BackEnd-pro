if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport  = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 

//router 
const listingRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/reviews.js");
const userRouter = require("./routers/user.js");

//For access the listing page.
const listingController = require("./controllers/listing.js");

//let MONGOOSE_URL = 'mongodb://127.0.0.1:27017/wanderlist';
let dbUrl=process.env.MongoAtasdb

async function main(){
    await mongoose.connect(dbUrl);
}
main().then(()=>console.log("Database connected"))
.catch((err)=>console.log("something error in the Database", err));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("error", (err)=>{
    console.log("Error in Mongo-Session ", err);
})

const sessionOption = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};
app.use(session(sessionOption));
app.use(flash());

//authentication.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash message middleware.
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//This code for searching functionality.
app.post("/search", (req,res,next)=>{
    req.session.searchName = req.body.searchName;
    res.redirect("/listing");
})

//render the main page. (Listing).
app.get("/", (listingController.index));

//Router Defined!
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/user", userRouter);

//When page not Found!
app.all("/*splat", (req,res,next)=>{
    next(new ExpressError(404, "This root are page not available!"));
});

//Error Handling Middleware!
app.use((err, req, res, next)=>{
    let {statusCode=500, message="sothing thing error"} = err;
    console.log(err);
    res.status(statusCode).render("listing/Error.ejs",{message});
});

app.listen(4040, ()=>console.log("server start on the port Number 4040"));
