const express = require("express");
const BmiCalculation = require("../Schema/BmiSchema");

const BmiRoute = express.Router();

// Route to calculate BMI
BmiRoute.post("/calculate-bmi", async (req, res) => {
  try {
    const { userId, height, weight } = req.body;
    let temp = weight / (height * height);
    var bmi = temp.toFixed(2);
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

// Route to get BMI calculation history

BmiRoute.get("/bmi-history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const value = await BmiCalculation.find({ userId: id });
    res.status(200).send(value);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = BmiRoute;
