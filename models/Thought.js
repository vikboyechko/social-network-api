const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formattedDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formattedDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// get total count of reactions
// prettier-ignore
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
});

function formattedDate(date) {
    return date.toLocaleDateString();
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
