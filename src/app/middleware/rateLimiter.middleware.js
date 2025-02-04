import {rateLimit} from 'express-rate-limit'
import { TooManyRequestsError } from '../../lib/error-definitions.js';

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,

    handler: () => {throw new TooManyRequestsError("Too many requests, please try again in 15 minutes.")}
});

export default rateLimiter;