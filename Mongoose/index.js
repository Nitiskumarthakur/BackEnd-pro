const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
main().then(()=>console.log("sucessfull connection Ok"))
.catch((err)=>console.log(err));
//Design the Schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    city:String,
    age:Number
});
//Model
const User = mongoose.model("User", userSchema);
//Insert data
// const user1 = new User({
//     name:"adam",
//     email:"adam@email.com",
//     city:"adapur",
//     age:24
// }).save();

const user2 = new User({
    name:"batMen",
    email:"batman@email.com",
    city:"batpur",
    age:31
});
//user2.save().then(res =>console.log(res)).catch(err =>console.log(err));

//******Insertion Many********
// User.insertMany([
//     {name:"Jone", age:33},
//     {name:"dev", age:28},
//     {name:"evile", age:4}
// ]);

//********find******
// User.find({age:{$eq:33}}).then(data =>{
//     console.log(data);
// }).catch(err =>{console.log(err)});

//*****Update******
// User.updateOne({name:"evile"}, {age:41}).then(res =>{
//     console.log(res);
// }).catch(err => console.log(err));

//*******Find and update********
// User.findByIdAndUpdate("69e5a7dd8582e253c91e1706", {name:"kumbha"}, {new:true})
// .then((res)=>console.log(res))
// .catch(err =>console.log(err));

//***** DELETE */
//User.deleteOne({name:"evile"}).then(res =>console.log(res));
User.findByIdAndDelete("69e546984d59378a86a08dae").then(res => console.log(res));
