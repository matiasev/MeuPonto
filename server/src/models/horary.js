const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
  day: {
    type: Date,
    require: false
  },
  start: {
    type: Date,
    require: false
  },
  startLunch: {
    type: Date,
    require: false
  },
  endLunch: {
    type: Date,
    require: false
  },
  end: {
    type: Date,
    require: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
})

module.exports = mongoose.model("Horary", schema)