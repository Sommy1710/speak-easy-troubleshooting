import {model, Schema} from "mongoose";
import argon from "argon2";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        requires: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    profilePicture: {
        type: String,
        default: null
    }
}, {timestamps: true});

//here we utilize mongoose middleware to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await argon.hash(this.password);
    }
    next();
});

export const User = model('User', UserSchema);