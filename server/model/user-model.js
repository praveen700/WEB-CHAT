module.exports = mongoose => {
    var schema = new mongoose.Schema(
        {
            iss: {
                type: String,
            },
            nbf: {
                type: Number,
            },
            aud: {
                type: String,
            },
            sub: {
                type: String,
                required: true
            },
            email: {
                type: String,
            },
            email_verified: {
                type: Boolean,
            },
            name: {
                type: String,
                required: true
            },
            given_name: {
                type: String,
            },
            picture: {
                type: String,
                required: true
            },
            family_name: {
                type: String,

            },
            iat: {
                type: Number,

            },
            exp: {
                type: Number,

            },
            jti: {
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

    const User = mongoose.model("userinfos", schema);
    return User;
};
