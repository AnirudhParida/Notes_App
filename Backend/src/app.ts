import 'dotenv/config';
import express from 'express';
import noteRoutes from './routes/notes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
    next(Error('Not found'));
})

app.use((error:unknown, req:express.Request, res:express.Response, next:express.NextFunction) => {
    
        console.error(error);
        if (error instanceof Error){
            res.status(500).json({ error: error.message });
        }

    next();
});


export default app;