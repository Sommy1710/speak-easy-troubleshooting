import { NotFoundError, UnauthenticatedError } from '../../lib/error-definitions.js';
import * as userService from './user.service.js'
import argon from 'argon2';
import { generateToken } from './../providers/jwt.provider.js';

//authenticate is for log in.
export const authenticateUser = async(payload) => 
{
   const user = payload.username ? await userService.getUserByUserName(payload.username)
   : await userService.getUserByEmail(payload.email); 

   if(!user) throw new NotFoundError('invalid credentials, please try again');

   if(!(await argon.verify(user.password, payload.password))) throw new UnauthenticatedError('invalid credentials, please try again');

   return generateToken({
      sub: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following
   });
};

export const registerUser = async(payload) => 
{
   return await userService.createUser(payload);
}