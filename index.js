const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');


const corsOptions = {
    origin: "*",
    methods: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
