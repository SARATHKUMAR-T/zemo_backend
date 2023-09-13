import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Streak } from "../Models/Streak.js";
import { isAuthenticated } from "../auth.js";

export const StreakRouter = express.Router();

StreakRouter.post("/addstreak", isAuthenticated, async (req, res) => {
  try {
    const streak = req.body;
    await new Streak({ ...streak, creator: req.user._id }).save();
    res.status(200).json({ message: "New Streak Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

StreakRouter.get("/getstreaks", isAuthenticated, async (req, res) => {
  try {
    const streaks = await Streak.find({ creator: req.user._id });
    if (streaks) {
      res
        .status(200)
        .json({ streaks, message: "Streaks fetched successfully" });
    } else {
      res.status(400).json({ message: "Unable to fetch Streaks" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
StreakRouter.delete("/streak/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const deleteStreak = await Streak.findByIdAndDelete({ _id: req.params.id });
    if (!deleteStreak) {
      res;
      res.status(400).json({ message: "error occured" });
      return;
    } else {
      res.status(200).json({ message: "Streak Deleted Successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

StreakRouter.patch("/streaks/start/:id", isAuthenticated, async (req, res) => {
  try {
    // const startdate = new Date().toLocaleString();

    // const options = {
    //   year: "numeric",
    //   month: "numeric",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    //   timeZoneName: "short",
    //   hour12: false,
    // };

    // const formatter = new Intl.DateTimeFormat("en-US", options);
    // const formattedDate = formatter.format(new Date());

    const streak = await Streak.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isstarted: true, startdate: req.body.startdate } },
      { new: true }
    );
    if (streak) {
      res.status(200).json({ streak, message: "Streak Started successfully" });
    } else {
      res.status(400).json({ message: "Unable to start the streak" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
