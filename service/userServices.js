const { User } = require('../models')
const CustomError = require('../utils/customError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')

const createUserService = async userData => {
  const {
    username,
    email,
    phone,
    profileImage,
    gender,
    password,
    confirmPassword,
  } = userData

  if (password !== confirmPassword) {
    throw new CustomError('Passwords do not match', 400)
  }

  const existingUserByEmail = await User.findOne({ where: { email } })
  if (existingUserByEmail) {
    throw new CustomError('Email already in use', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    username,
    email,
    phone,
    profileImage,
    gender,
    password: hashedPassword,
  })

  const token = generateToken(newUser)
  const { password: userPassword, ...userWithoutPassword } = newUser.dataValues

  return { user: userWithoutPassword, token }
}

const loginUserService = async userData => {
  const { email, password } = userData

  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new CustomError('User not found', 404)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new CustomError('Invalid password', 400)
  }

  const token = generateToken(user)

  const { password: userPassword, ...userWithoutPassword } = user.dataValues

  return { userWithoutPassword, token }
}

const getAllUserService = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    include: { association: "addresses" },
  });
  if (!users) {
    throw new CustomError('No users found', 404)
  }
  return users
}

const getUserByIdService = async id => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: { association: "addresses" },
  });
  if (!user) {
    throw new CustomError('User not found', 404)
  }
  return user
}

const updateUserByIdService = async (id, userData) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
  if (!user) {
    throw new CustomError('User not found', 404)
  }
  const updatedUser = await user.update(userData)
  return updatedUser
}

const deleteUserByIdService = async id => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new CustomError('User not found', 404)
  }
  await user.destroy()
  return user
}

module.exports = {
  createUserService,
  loginUserService,
  getAllUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
}
