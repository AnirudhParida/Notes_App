import 'dotenv/config';
import express from 'express';
import noteRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError,{isHttpError} from 'http-errors';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
    next(createHttpError(404,'Not found'));
})

app.use((error:unknown, req:express.Request, res:express.Response, next:express.NextFunction) => {
    
        console.error(error);
        let errorMessage = "An error occurred, please try again later";
        let statusCode = 500;
        if(isHttpError(error)){
            statusCode = error.status;
            errorMessage = error.message;
        }
        res.status(statusCode).json({error: errorMessage});
    next();
});


export default app;