const express = require("express");
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapasync = require("../Utils/wrapasync.js");
const {isLoggedIN, isOwner,validationListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage, cloudinary} = require('../cloudConfig.js');
const upload = multer({storage});

//Index route
router.get("/", (listingController.index));

// for newpost get route
router.get("/newList",isLoggedIN,(listingController.newListForm));

//Show Rounting.
router.get("/:id", wrapasync(listingController.showList));

//Post Method / Create List.
router.post("/",isLoggedIN,
    validationListing,
    upload.single('listing[image]'), //for multer used.
    (listingController.creatList)
);

//Edit Your Data
router.get("/:id/edit",isLoggedIN,isOwner, (listingController.editListForm));

router.patch("/:id",
    isLoggedIN,
    isOwner,
    validationListing,
    upload.single('listing[image]'), 
    wrapasync (listingController.editList)
);
//delete
router.delete("/:id" ,isLoggedIN,isOwner, wrapasync (listingController.deleteList));

module.exports = router;