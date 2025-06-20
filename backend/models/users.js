import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:["buyer","seller"],
        default: "buyer"
    },
    image:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User',userSchema);

export default User;