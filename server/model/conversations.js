module.exports = mongoose => {
    var schema = new mongoose.Schema(
      {
        members: {
            type: Array
        },
        message:{
            type: String,
        },
  
      },
      { timestamps: true }
  
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Conversation = mongoose.model("Conversations", schema);
    return Conversation;
  };
  