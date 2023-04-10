const express = require("express");
const BmiCalculation = require("../Schema/BmiSchema");

const BmiRoute = express.Router();

// Route to calculate BMI
BmiRoute.post("/calculate-bmi", async (req, res) => {
  try {
    const { userId, height, weight } = req.body;
    const bmi = weight / (height / 100) ** 2;
    const timestamp = new Date();
    const calculation = new BmiCalculation({
      userId,
      height,
      weight,
      bmi,
      timestamp,
    });
    await calculation.save();
    res.status(200).send(calculation);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = BmiRoute;
