const db = require("../model");
const Message = db.messages;
const Conversation = db.conversation;

const dbConfig = require("../config/db.config.js");
const MongoClient = require('mongodb').MongoClient;



async function newMessage(req, res) {
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
       
        const newMessage = new Message(req.body)
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text})
        return res.status(200).json({
            message: "newMessage has been saved successfully"
        })
    } catch (error) {
        return res.status(500).json(error.message)

    } finally {
        await client.close();
    }
}

async function getMessages(req, res){
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const newMessage = await Message.find({ conversationId: req.params.id });
        return res.status(200).json(newMessage)

    } catch (error) {
        return res.status(500).json(error.message)

    } finally {
        await client.close();
    }

}
module.exports = {

    newMessage,
    getMessages
   
}
