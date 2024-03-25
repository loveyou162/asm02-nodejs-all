const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["hotel", "apartments", "resorts", "villas", "cabins"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  distance: {
    type: String,
    require: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("Hotel", hotelSchema);
