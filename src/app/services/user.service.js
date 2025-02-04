import {User} from "../schema/user.schema.js";
import { ConflictError } from "../../lib/error-definitions.js";

export const getUserById = async id =>
{
    return await User.findById(id);
}

export const getUserByEmail = async email =>
{
    return await User.findOne({email})
    .populate('followers')
    .populate('following');
}

export const getUserByUserName = async username =>
{
    return await User.findOne({username}).populate('followers').populate
    ('following');
};

export const createUser = async payload => {
    const user = await User.findOne({
        email: payload.email,
        username: payload.username,
    });
    if(user) throw new ConflictError('user already exists');

    if (!user)
    {
        const exists = await User.findOne({
            $or: [
                {email: payload.email},
                {username: payload.username}
            ]
        });

        if (exists) throw new ConflictError('User already exists');
    }

    return await User.create(payload);
};