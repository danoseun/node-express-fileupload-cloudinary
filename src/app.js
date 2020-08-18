import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { userObj } from '../src/controllers/user'

const { registerUser, fetchAllUsers, fetchSingleUser } = userObj;



dotenv.config();

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/users', fileUpload({useTempFiles: true}) , registerUser);
app.get('/users', fetchAllUsers);
app.get('/users/:id', fetchSingleUser);

const port = process.env.PORT || 1100;
app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});

export default app;