let express = require("express");
let app = express();

let cors = require("cors");

app.use(express.json());
app.use(cors());

let Pusher = require("pusher");

let port =process.env.PORT || 4500;



let mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://admin:SbwSPyhCnO19uoGy@cluster0.2rxre.mongodb.net/whatsappDB?retryWrites=true&w=majority`, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;



db.once("open", ()=>{
    console.log("DB is connected");

    const msgCollection = db.collection("messagecontents");
   //console.log(msgCollection);
    const changeStream = msgCollection.watch();
    
    changeStream.on('change', (change)=>{
       // console.log(change);

        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted", {
                name : messageDetails.name,
                message :messageDetails.message,
                timestamp : messageDetails.timestamp,
                received : messageDetails.received
            });
        } else {
            console.log("Error tiggering pusher");
        }
    })
});

const pusher = new Pusher({
    appId: '1076276',
    key: '4131d51c18ac36bb3f2c',
    secret: '88096639c4bac1d9660e',
    cluster: 'ap2',
    encrypted: true
  });


let route = require('./router');
app.use('/api', route);

app.listen(port, ()=>console.log(` ${port} is working`));

  