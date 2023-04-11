const mongoose = require("mongoose");
const bmiSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bmi: Number,
  timestamp: Date,
});
const BmiCalculation = mongoose.model("BmiCalculation", bmiSchema);

module.exports = BmiCalculation;
