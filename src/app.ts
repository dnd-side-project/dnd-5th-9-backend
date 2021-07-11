import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import config from './config';
import { createConnection } from 'typeorm';
import connectionOptions from './ormconfig';
// import indexRouter from './api';

const app = express();
const PORT = config.port || 3000;

createConnection(connectionOptions)
    .then(() => {
        console.log('DB Connetion Success');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', indexRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Server listen http://localhost:${PORT}`);
});
