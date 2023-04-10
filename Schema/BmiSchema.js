const mongoose = require("mongoose");
const bmiSchema = new mongoose.Schema({
  userId: String,
  height: Number,
  weight: Number,
  bmi: Number,
  timestamp: Date,
});
const BmiCalculation = mongoose.model("BmiCalculation", bmiSchema);

module.exports = BmiCalculation;
