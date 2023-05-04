const User = require('../models/userModel');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
 
    //get json data request from user
    const { email, name, password } = req.body;
    //throw error if email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }
  
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    

    const role = isFirstAccount ? 'admin' : 'user';
    //Note: .save pre-hook on user model ensure password is hashed
    //create a user
    const user = await User.create({ name, email, password, role });
    //object to create token for user
    const tokenUser = createTokenUser(user);
    //create token and attach cookie to our response
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  };



module.exports = {
  register,
  // login,
  // logout,
};