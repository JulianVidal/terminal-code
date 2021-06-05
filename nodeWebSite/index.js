const express = require('express');
const app = express();
const port = 3000;
const site = '/Users/JulianVidal/Documents/terminal-code/nodeWebSite/website/index.html';

//app.get('/', (req, res) => res.sendFile(site));

app.use(express.static('website'));

app.listen(port);