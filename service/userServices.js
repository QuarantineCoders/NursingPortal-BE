const { User } = require("../models");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const createUserService = async (userData) => {
  const {
    username,
    email,
    phone,
    profileImage,
    gender,
    password,
    confirmPassword,
  } = userData;

  if (password !== confirmPassword) {
    throw new CustomError("Passwords do not match", 400);
  }

  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    throw new CustomError("Email already in use", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    phone,
    profileImage,
    gender,
    password: hashedPassword,
  });

  const token = generateToken(newUser);

  return { user: newUser, token };
};

const loginUserService = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError("Invalid password", 400);
  }

  const token = generateToken(user);

  const { password: userPassword, ...userWithoutPassword } = user.dataValues;

  return { userWithoutPassword, token };
};

module.exports = {
  createUserService,
  loginUserService,
};
