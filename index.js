const express = require("express");
const sha256 = require("crypto-js/sha256");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

class Block {
    constructor(
        index,
        timestamp,
        transaction,
        precedingHash
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash()
    }

    // computeHash() {

    // }
}