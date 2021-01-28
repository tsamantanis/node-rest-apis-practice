import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import models from '../models';

const app = express();

app.use(cors());

// Accessing the payload of an HTTP POST request is provided within
// Express with its built-in middleware which is based on body-parser.
// It enables us to transform body types from our request object (e.g. json, urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This extracts the entire body portion of an incoming request stream and makes it accessible on req.body

// A middleware is just a JavaScript function which has access to three arguments: req, res, next.
// Template:
// app.use((req, res, next) => {
  // do something
  // next();
// });
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});


// example routes

app.get('/', (req, res) => {
    // curl
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    // curl -X POST
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    // curl -X PUT
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    // curl -X DELETE
    return res.send('Received a DELETE HTTP method');
});

// user routes

app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
    return res.send(
        `PUT HTTP method on user/${req.params.userId} resource`,
    );
});

app.delete('/users/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});

// messages routes

app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };
    req.context.models.messages[id] = message;
    return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;
    req.context.models.messages = otherMessages;
    return res.send(message);
});

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
);
