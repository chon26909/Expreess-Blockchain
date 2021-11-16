const express = require("express");
const sha256 = require("crypto-js/sha256");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

class Block {
    
}