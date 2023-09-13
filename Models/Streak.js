import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const streakSchema = new mongoose.Schema({
  streakname: {
    type: String,
  },
  maxdays: {
    type: String,
  },
  isstarted: {
    type: Boolean,
    default: false,
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: ObjectId,
    ref: "user",
  },
  description: {
    type: String,
  },
  startdate: {
    type: String,
  },
});

export const Streak = mongoose.model("Streak", streakSchema);
