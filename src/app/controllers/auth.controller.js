import { BadRequestError, ValidationError } from "../../lib/error-definitions.js";
import asyncHandler from '../../lib/async-handler.js';
import * as authService from '../services/auth.service.js';
import validator from "../../lib/input-validator.js";
import { RegisterRequest } from "../requests/register.request.js";
import { LoginRequest } from "../requests/login.request.js";


export const registerUser = asyncHandler(async (req, res) =>
{
    const {username, password, email} = req.body;

    //validate the request body
    const {errors} = validator(RegisterRequest, req.body);

    if (errors) throw new ValidationError ("the request failed with the following errors", errors);

    const user = await authService.registerUser({username, password, email});

    return res.status(201).json({
        success: true,
        message: 'user registered successfully',
        data:{
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }
    })
});

export const loginUser = asyncHandler(async(req, res) => 
{
    //this brings out the username, email, password from the req.body
    const {username, email, password} = req.body;
    //validator is a function that checks if the data in req.body meets the rules defined in LoginRequest. if they are any errors, it puts them in the errors variable
    const {errors} = validator(LoginRequest, req.body);

    if(errors) throw new ValidationError("the request failed with the following errors", errors);

    const token = username
    ? await authService.authenticateUser({username, password})
    : await authService.authenticateUser({email, password});

    return res.json({
        success: true,
        message: 'user logged in successfully',
        authorization: {
            token,
            type: 'Bearer'
        }
    })
});

export const fetchLoggedInUser = asyncHandler(async (req, res) => {
    return res.json({
        success: true,
        message: "user fetched successfully",
        data: {
            user: req.user,
        },
    });
});