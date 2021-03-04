const mongoose = require("mongoose");

const OptionsSchema = new mongoose.Schema({
        option: String,
        votes: {
          type: Number,
          default: 0,
        },
});

const PollsSchema = new mongoose.Schema({
      question: String,
      options: [OptionsSchema],
      voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      created: {
          type: Date,
          default: Date.now,
      }
});

module.exports = mongoose.model("Poll", PollsSchema);