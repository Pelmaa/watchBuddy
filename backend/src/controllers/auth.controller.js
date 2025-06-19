const authService = require("../services/auth.service");
const signIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: `Body cannot be empty!` });
  }
  const keys = Object.keys(req.body);
  const requiredKey = ["email", "password"];
  const missingKeys = requiredKey.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(", ")}`,
    });
  }

  const result = await authService.signIn(req.body);

  if (result.userNotFound) {
    return res.status(400).json({
      message: `User not found with the provided email ${req.body.email}`,
    });
  }

  if (result.passwordMisMatched) {
    return res
      .status(400)
      .json({ message: `the provided password is incorrect` });
  }
  res.json({ token: result.token });
};

const signUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: `body cannot be empty`,
    });
  }

  const { email, password } = req.body;
  const keys = Object.keys(req.body);
  const requiredKey = ["name", "phoneNumber", "email", "password"];
  const missingKeys = requiredKey.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-z])(?=.*\d)(?=.*[!#$%@*]).{8,}$/;

  if (password.length < 8) {
    return res.status(400).json({
      message: ` The password must be minimum of 8 chars)`,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: `password should have special char`,
    });
  }
  const result = await authService.signUp(req.body);
  if (result.userAlreadyExists) {
    return res.status(400).json({
      message: `user already exists ${email}`,
    });
  }
  res.status(201).json({ message: `User wit ${email} created successfully` });
};
const signout = async (req, res) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];
  await authService.signout(token);

  res.status(204).json({
    message: `signout successfully`,
  });
};
const getLoggedInUser = async (req, res) => {
  const user = req.user;

  const userData = await authService.getLoggedInUser(user._id);

  res.status(200).json({
    message: `User fetched successfully`,
    user: userData,
  });
};

module.exports = { signIn, signUp, signout, getLoggedInUser };
