const Listing = require("../models/listing.js");

module.exports.index = async (req, res)=>{
    let searchName  = req.session.searchName;
    if(searchName){
        const allListing = await Listing.find({title:{$regex:"^"+searchName, $options:"i"}});
        req.session.searchName="";
        res.render("listing/index.ejs", {allListing});
    }else{
    let allListing = await  Listing.find({});
    let count = await Listing.countDocuments();
    res.render("listing/index.ejs", {allListing, count});
    }
};

module.exports.newListForm = (req, res)=>{
    res.render("listing/newList.ejs")
};

module.exports.showList = ( async(req, res, next)=>{
    let {id} = req.params;
    let list = await  Listing.findById(id)
      .populate({
        path:"reviews", 
        populate:{
            path:"author"
        }
      }).populate('owner');
    // console.log(list);
    // console.log("user ",req.user );
    res.render("listing/showlist.ejs", {list});
});

module.exports.creatList = async (req, res,next)=>{ 
    let url = req.file.path;
    let filename = req.file.filename;
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = {url, filename};
    await newList.save();
    req.flash("success", "Congratulations, successfuly creat New List!");
    res.redirect("/");
};

module.exports.editListForm = async(req,res)=>{
    let {id} = req.params;
    let EditList = await Listing.findById(id);
    let originalImage = EditList.image.url;
    console.log(originalImage)
    originalImage = originalImage.replace("/upload", "/upload/w_150/o_30" );
    res.render("listing/edit.ejs", {EditList, originalImage});
};

module.exports.editList = async (req, res)=>{
    let {id} = req.params;
    let updatedlist = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedlist.image = {url, filename};
    }
    await updatedlist.save();
    req.flash("success", "SuccessFul Updated Data.");
    res.redirect(`/${id}`);
};

module.exports.deleteList = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "SuccessFul Deleted!");
    res.redirect("/");
};
