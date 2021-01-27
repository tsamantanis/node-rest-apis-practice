import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

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

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
    return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
);
