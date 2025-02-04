import appConfig from "../../config/app.config.js";
import jwt from "jsonwebtoken";

//what is contained in the payload (sub: userId, name: userName, email: userEmail, iat: issuedAt, exp: expiresAt)

export const generateToken = (payload) => {
    return jwt.sign(payload, appConfig.jwt.secret, {expiresIn: appConfig.jwt.expiresIn});
};
//we generate the token here with sign

export const verifyToken = (token) => {
    return jwt.verify(token, appConfig.jwt.secret)
}; 

//here we verify the token with verify, thats after generating it.
// we pass the token (token) which is usually a string and then we verify it against the secret key.