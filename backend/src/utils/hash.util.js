const bcrypt = require("bcrypt");
const saltRounds = 10;

const createHash = async (plainText) => {
  const hash = await bcrypt.hash(plainText, saltRounds);
  return hash;
};

const compareHash = async (plainText, hash) => {
  const isMatched = await bcrypt.compare(plainText, hash);
  return isMatched;
};

module.exports = { createHash, compareHash };
