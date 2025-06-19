const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Non-Binary", "Other", "Prefer not to say"],
        message: "{VALUE} is not a valid gender",
      },
    },
  },

  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
