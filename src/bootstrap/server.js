import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import listRoutes from 'express-list-routes'
import {createServer} from 'http'
import { NotFoundError } from '../lib/error-definitions.js'
import errorMiddleware from '../app/middleware/error.middleware.js'
import { authRouter } from '../routes/auth.js'

const app = express();
const server = createServer(app);

//middleware
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

//routes
app.get('/health', (req, res) =>
{
    return res.json({
        success: true,
        message: 'the server is up and running'
    });
})
// other routes
// auth routes
app.use('/api/v1/auth', authRouter);

//route not found
app.use('*', (req, res) =>
{
    throw new NotFoundError(`route ${req.originalUrl} does not exist on this server`);
});

//error handler
app.use(errorMiddleware);


//list all routes
listRoutes(app);

export
{
    server, 
    app
}