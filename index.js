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

    obtainLatestBlock() {
        console.log(this.blockchain)
        return this.blockchain[this.blockchain.length -1 ];
    }

    addNewBlock(newBlock) {
        
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }

    checkChainValidity() {
        for (let i = 0; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if(currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            if (currentBlock.precedingHash !== precedingBlock.hash()) {
                return false;
            }
            
        }
        return true;
    }
}

const Globalchain = new BlockChain();

class HiChonCoin extends BlockChain {

    constructor() {
        super();
        this.chain = [];
    }


    validateNewChain = (req,res,next) => {

        const { id, name, genesis, genesis:{ date, transaction } } = req.body;

        console.log(id , name , date , transaction)

        if (id && name && genesis && date && transaction) {
            next();
        }  
        else {
            res.status(400).json({ message: "Request format is not correct!" });
        }
    }

    craeteNewChain(req,res) {

        const { id, name, genesis } = req.body;

       const block = Globalchain.create(id, name, genesis);

       res.status(200).json({ message: "Created", data: Globalchain })
    }


    appendNewChild = (req,res) => {
        
        const { timestamp, transaction } = req.body;

        const block = new Block(this.chain.length, timestamp, transaction);

        Globalchain.addNewBlock(block); 
        res.status(200).json({ message: "Chain Added!"})
    }

    getChain = (rew,res) => {
        res.status(200).json({chain: Globalchain})
    } 
}

const Controller = new HiChonCoin();

app.get("/", (req,res) => {
    res.send("Hello World");
})

//get chain
app.get("/api/blockchain",Controller.getChain);

//add block
app.post("/api/blockchain", Controller.appendNewChild);

//genesis block
app.post('/api/blockchain/genesis', Controller.validateNewChain, Controller.craeteNewChain);

app.listen(9000, () => {
    console.log("server start on port 9000");
});