const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
//send email controller
const sendEmailEthereal = require('./sendEmail');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
 
    //get json data request from user
    const { email, name, password } = req.body;
    //throw error if email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    if(password === undefined || password === null || password === "") {
      throw new CustomError.BadRequestError('Password is required');
    }

    const newPassword = String(password);
  
    // // first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0;
    

    // const role = isFirstAccount ? 'admin' : 'user';
    // //Note: .save pre-hook on user model ensure password is hashed
    // //create a user
    // const user = await User.create({ name, email, password: newPassword, role });
    // //object to create token for user
    // const tokenUser = createTokenUser(user);
    // //create token and attach cookie to our response
    // attachCookiesToResponse({ res, user: tokenUser });
    await sendEmailEthereal();
    // res.status(StatusCodes.CREATED).json({ user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: "name" });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    
    const passwordString = String(password);
    //compare password
    const isPasswordCorrect = await user.comparePassword(passwordString);
    
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    //create token for user
    const tokenUser = createTokenUser(user);
    //attach cookie to res
    attachCookiesToResponse({ res, user: tokenUser });
  
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };


module.exports = {
  register,
  login,
  // logout,
};