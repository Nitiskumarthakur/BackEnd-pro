const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
main().then(res => console.log("sucessful connection"))
.catch(err => console.log(err, "err"));

const bookSchema = new mongoose.Schema({
    autor:{
        type:String,
        required:true,
        lowercase:true
    },
    title:{
        type:String,
        required:true,
        uppercase:true
    },
    price:{
        type:Number,
        default:99
    },
    language:{
        type:String,
        enum:["hindi", "english"],
    },
    order:{
        type:Number,
        min:[1, "Minimum order One"]
    }
});

const Book = mongoose.model("Book", bookSchema); //Define model yani Collection.
// const b1 = new Book({title:"Apna koe nahi",autor:"nkt", language:"hindi", order:2});
// b1.save().then(res =>console.log(res)).catch(err =>console.log(err));
// Book.find().then(res => console.log(res));

Book.updateOne({autor:"nkt"}, {order:0},{runValidators:true})
.then(res =>console.log(res)).catch(err =>console.log(err.errors.order.properties.message));
