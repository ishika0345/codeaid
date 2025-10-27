import mongoose from "mongoose";

const connectDB = async () => {
    try{
 mongoose.connection.on('connected',()=>console.log('Database connected successfully'));
        await mongoose.connect(`${process.env.MONGODB_URL}/codeaid`)
    }
        catch(error){
         console.log(error.message)
        }
}
export default connectDB;