let express = require("express");
let router = express.Router();

let Messages = require('./db');

router.get('/messages/sync',(req,res)=>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

router.post('/v1/messages/new', (req,res)=>{
    let dbMessage = req.body;

    Messages.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

module.exports = router;