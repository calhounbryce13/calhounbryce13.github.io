/*
** Author: Bryce Calhoun
** Description: In the MVC pattern this file represents the model which communicates 
                directly with the database.
*/

import mongoose from 'mongoose';
import 'dotenv/config';


mongoose.connect(process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

//* defining the schema for each document in the collection
const modelSchema = mongoose.Schema({
    "firstName":{type:String, required:false},
    "lastName":{type:String, required:false},
    "emailAddress":{type:String, required:false},
    "usersMessage":{type:String, required:false}
});

//* compiling the schema
const users = mongoose.model("webpageUser", modelSchema);

//* defining a function to create a new document in the collection with data
const createUser = async (first, last, email, mssg) => {

    const myUser = new users({firstName:first, lastName: last, emailAddress: email, usersMessage: mssg});
    return myUser.save();
};

//* exporting the required function(s)
export {createUser};