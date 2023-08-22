module.exports = mongoose => {
    var schema = new mongoose.Schema(
        {
            conversationId: {
                type: String,
            },
            senderId: {
                type: Number,
            },
            receiverId: {
                type: Number,
            },
            text: {
                type: String,
            },
            type: {
                type: String,
                required: true
            },
           

        },
        { timestamps: true }

    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Messages = mongoose.model("Messages", schema);
    return Messages;
};
