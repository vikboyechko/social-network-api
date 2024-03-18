const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    //prettier-ignore
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought
                .find()
                .populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500)
                .json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }.populate('thoughts')
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
