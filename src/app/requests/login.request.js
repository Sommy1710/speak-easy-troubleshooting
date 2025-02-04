import Joi from 'joi'

export const LoginRequest = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}}).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    password: Joi.string().required()
});