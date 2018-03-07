const mongoose = require("mongoose")
const Horary = mongoose.model("Horary")

exports.get = async (id) => {
  const res = await Horary
    .find({ 
      user: id
    }, 'day start startLunch endLunch end user')
    .populate("user", "name")
  return res
}

exports.getById = async (id) => {
  const res = await Horary.getById(id)
    .populate("user")
  return res
}

exports.create = async (data) => {
  const horary = new Horary(data)
  await horary.save()
}

exports.update = async (id, data) => {
  await Horary.findByIdAndUpdate(id, {
    $set: {
      day: data.day,
      start: data.start,
      startLunch: data.startLunch,
      endLunch: data.endLunch,
      end: data.end
    }
  })
}

exports.remove = async (id) => {
  await Horary.findOneAndRemove(id)
}