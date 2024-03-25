const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: {
    type: Array,
    // ref: "Room",
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    enum: ["Credit Card", "Cash"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Booked", "Checkin", "Checkout"],
    default: "Booked",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
