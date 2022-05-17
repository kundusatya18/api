const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ','')
  console.log(token)
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication');
  }

  try {
    const payload = isTokenValid(token);
    console.log(payload)
    //exit();
    // Attach the user and his permissions to the req object
    req.user = payload.user;

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalidddd');
  }
};
// authorizePermissions
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
