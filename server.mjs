// (A) REQUIRED MODULES
// npm install express peer
import { createRequire } from 'module'
import express from "express"
import path from "node:path"

const require = createRequire(import.meta.url)

const fs = require('fs')

var https  = require('https');

var privateKey  = fs.readFileSync('./certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('./certificates/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};


var morgan = require('morgan')


const cors = require('cors');

// (B) EXPRESS SERVER
// http://localhost/a
// http://localhost/b
const app = express();

var httpsServer = https.createServer(credentials, app);

app.use(morgan('combined'))

app.use(cors({
  origin:"*",
  optionsSuccessStatus: 200
}));

app.get("/", (req, res) => res.send("yo dawg, this shit is WORKING!"));

const server = httpsServer.listen(9000);