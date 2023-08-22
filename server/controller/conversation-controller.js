const db = require("../model");
const Conversation = db.conversation;
const dbConfig = require("../config/db.config.js");
const MongoClient = require('mongodb').MongoClient;



async function newConversation(req, res) {
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const exists = await Conversation.findOne({
            members: { $all: [receiverId, senderId] }
        });
        
        if (exists) {
            return res.status(200).json({
                message: "conversation already exists"
            })
        }
        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })
        await newConversation.save();
        return res.status(200).json({
            message: "conversation saved successfully"
        })

    } catch (error) {
        return res.status(500).json(error.message)

    } finally {
        await client.close();
    }
}

async function getConversation(req, res){
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const conversation = await Conversation.findOne({
            members: { $all: [receiverId, senderId] }
        });
        
        if (conversation) {
            return res.status(200).json(conversation)
        }

    } catch (error) {
        return res.status(500).json(error.message)

    } finally {
        await client.close();
    }

}
module.exports = {

    newConversation,
    getConversation
}
