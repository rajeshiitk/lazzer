import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const connection  = mongoose.connection;

        connection.on("connected", () => {
            console.log("Successfully Connected to MongoDB database");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error Please make sure MongoDB is running " + err);
           process.exit();
        });

    }
    catch(err){
        console.log("Error while connecting to database");
        console.log(err);
    }
}