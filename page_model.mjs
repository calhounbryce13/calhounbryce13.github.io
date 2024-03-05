import mongoose from 'mongoose';
import 'dotenv/config';



mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


const modelSchema = mongoose.Schema({
    "firstName":{type:String, required:true},
    "lastName":{type:String, required:true},
    "email":{type:String, required:true},
    "message":{type:String, required:true}
});

const users = mongoose.model("webpageUser", modelSchema);

const createUser = async (first, last, email, mssg) => {
    const myUser = new users({firstName:first, lastName: last, email: email, message: mssg});
    return myUser.save();

}

export {createUser};