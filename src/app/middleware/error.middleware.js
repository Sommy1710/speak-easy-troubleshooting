import { BadRequestError, NotFoundError, UnauthorizedError, UnauthenticatedError, InternalServerError, ValidationError, TooManyRequestsError } from "../../lib/error-definitions.js";

const errorMiddleware = (err, req, res, next) =>
{
    if(err instanceof NotFoundError || err instanceof
        BadRequestError || err instanceof UnauthorizedError || err instanceof UnauthenticatedError || err instanceof InternalServerError || err instanceof TooManyRequestsError)
        {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message
            });
        }

        if(err instanceof ValidationError)
        {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
                errrors: err.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message
        });
    
};

export default errorMiddleware;