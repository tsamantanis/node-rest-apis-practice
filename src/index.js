import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import users from '../db/users';
import messages from '../db/messages';

const app = express();

app.use(cors());

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
    return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
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
    return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
);
