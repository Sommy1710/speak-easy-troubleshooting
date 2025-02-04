import Joi from 'joi'

export const RegisterRequest = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net", "academy"]}}).required(),
});