import app from './app';
import env from './util/validateenv';
import mongoose from 'mongoose';

const port = env.PORT;

mongoose.connect(env.MONGO_STRING).then(
    () => {
        console.log('Connected to database');
    }
).catch(console.error);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




