//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbmessages.js'
import Pusher from 'pusher'
import cors from 'cors'


// app config
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
    appId: "1316654",
    key: "bc1538e9324c705e1b7b",
    secret: "998c7f81d212e6e8aef0",
    cluster: "ap2",
    useTLS: true
});


///middleware
app.use(express.json())
app.use(cors())



//DB config

const connectionURL = 'mongodb+srv://admin:ai2ngU4Uz4WGjiaH@cluster0.q54bx.mongodb.net/wpclone?retryWrites=true&w=majority'
mongoose.connect(connectionURL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB Connected')
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: Boolean(messageDetails.received)

            })
        } else {
            console.log('Erroe triggering pusher')
        }
    })
})

//ai2ngU4Uz4WGjiaH
//api routes
app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

//listener
app.listen(port, () => console.log(`listening on host:${port} `))