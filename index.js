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

    computeHash() {
        return sha256(
            this.index + this.precedingHash + this.timestamp + JSON.stringify(this.transaction).toString()
        );
    }
}

class BlockChain {
    constructor() {
        this.id = '';
        this.name = '';
        this.blockchain = '';
        this.difficulty = '';
    }

    create(id, name, genesis) {
        this.id = id;
        this.name = name;
        this.blockchain = [this.startGenesisblock(genesis)];
        this.difficulty = 4;
    }

    startGenesisblock(genesis) {
        return new Block(0,genesis.date,genesis.transaction,"0");
    }

    obtainLatestBLock() {
        return this.blockchain[this.blockchain.length -1 ];
    }

    addNewBlock() {
        newBlock.precedingHash = this.obtainLatestBLock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }

    // checkChainValidity() {
    //     for (let i = 0; i < this.blockchain.length; i++) {
    //         const currentBlock = this.blockchain[i];
    //         const precedingBlock = this.blockchain[i - 1];

    //         if(currentBlock.hash !== currentBlock.computeHash()) {
    //             return false;
    //         }

    //         if (currentBlock.precedingHash !== precedingBlock.hash()) {
    //             return false;
    //         }
            
    //     }
    //     return true;
    // }
}