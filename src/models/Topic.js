const { Schema, model } = require("mongoose");

const TopicSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required:true
    }
})

module.exports = model("Topic",TopicSchema)
