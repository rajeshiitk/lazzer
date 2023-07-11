import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: [true,"Please provide an username"] , unique: true},
    email: { type: String, required:[true,"Please provide an Email"] , unique: true},
    password: { type: String, required: [true,"Please provide a Password"] },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: { type: String, default: null },
    forgotPasswordTokenExpiry: { type: Date, default: null },
    verifyToken: { type: String, default: null },
    verifyTokenExpiry: { type: Date, default: null },
})


const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;