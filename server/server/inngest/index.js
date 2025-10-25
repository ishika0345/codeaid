import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "codeaid-app" });



const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event:'clerk/user.created'},
    async({event})=>{
        await connectDB();
        
        const{id,first_name,last_name,email_addresses,image_url}= event.data
        let username = email_addresses[0].email_address.split('@')[0]

        console.log(`Successfully created user ${id} in database.`);

        const user = await User.findOne({username})
        if(user){
            username = username + Math.floor(Math.random()*10000)
        }
     const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        full_name: first_name + " "+last_name,
        profile_picture: image_url,
        username
    }
    await User.create(userData)
})


const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async({event})=>{
        await connectDB();
       
        const{id,first_name,last_name,email_addresses,image_url}= event.data

         console.log(`Successfully updated user ${id} in database.`);
        
        const updatedUserData={
            email:email_addresses[0].email_address,
            full_name: first_name + ' ' + last_name,
            profile_picture: image_url
        }
        await User.findByIdAndUpdate(id,updatedUserData)
})


const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-from-clerk'},
    {event:'clerk/user.deleted'},
    async({event})=>{
        await connectDB();
        
        const{id}= event.data
       await User.findByIdAndDelete(id)

       console.log(`Successfully deleted user ${id} from database.`);
})
// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];