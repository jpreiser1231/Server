const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
const port = 3000;

const message = "Hello!!";

app.get("/", (req, res) => {
    res.json({
        data: message
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})