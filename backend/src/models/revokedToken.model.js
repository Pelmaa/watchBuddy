const mongoose = require("mongoose");

const RevokedTokenSchema = new mongoose.Schema(
  {
    token: String,
  },
  { timestamps: true }
);

const RevokedToken = mongoose.model("revoked-token", RevokedTokenSchema);
module.exports = RevokedToken;
