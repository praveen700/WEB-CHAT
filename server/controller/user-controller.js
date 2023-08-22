const db = require("../model");
const Users = db.user;
const dbConfig = require("../config/db.config.js");
const MongoClient = require('mongodb').MongoClient;


async function create(req, res) {
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const database = client.db('test_demo');
        const collection = database.collection('userinfos');
        const list = await collection.find({}).toArray();
        const exist = list.length > 0 && list.filter((item) => item.sub === req.body.sub);
        if (exist) {
            res.status(200).json({ message: "User already Exists" });
        }else{

            const users = new Users({
                iss: req.body.iss,
                nbf: req.body.nbf,
                aud: req.body.aud,
                sub: req.body.sub,
                email: req.body.email,
                name: req.body.name,
                given_name: req.body.given_name,
                picture: req.body.picture,
                family_name: req.body.family_name,
                iat: req.body.iat,
                exp: req.body.exp,
                jti: req.body.jti,
    
            });
           const newUser = new Users(users);
            await newUser.save();
            return res.status(200).json(newUser)
        }
       

    } catch (error) {
        return res.status(500).json(error.message)

    } finally {
        await client.close();
    }
}

async function getUser(req, res) {
    let url = dbConfig.url;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const database = client.db('test_demo');
        const collection = database.collection('userinfos');
        const result = await collection.find({}).toArray();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(err.message)

    } finally {
        await client.close();
    }
}


module.exports = {
    create,
    getUser
}
