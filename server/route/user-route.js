module.exports = app => {
    const user = require("../controller/user-controller.js");
    const conv = require("../controller/conversation-controller.js");
    const msg = require("../controller/message-controller.js");
    var router = require("express").Router();
  
    // 
    router.post("/add", user.create);
    router.get("/users", user.getUser);
    router.post("/conversation/add", conv.newConversation);
    router.post("/conversation/get", conv.getConversation);
    router.post("/message/add", msg.newMessage );
    router.get("/message/get/:id", msg.getMessages );
    
  
  
    app.use("/api", router);
  };
  