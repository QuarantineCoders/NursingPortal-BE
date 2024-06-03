const { User } = require("../models");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserService = async (userData) => {
  const { username, email, phone, profileImage, gender, password } = userData;

  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    throw new CustomError("Email already in use", 409);
  }

  const existingUserByUsername = await User.findOne({ where: { username } });
  if (existingUserByUsername) {
    throw new CustomError("Username already in use", 409);
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

  return newUser;
};

const loginUserService = async (res, userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError("Invalid password", 400);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const { password: userPassword, ...userWithoutPassword } = user.dataValues;

  return { userWithoutPassword, token };
};

module.exports = {
  createUserService,
  loginUserService,
};
