const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}
/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists with this email address",
      status: "failed",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, getCookieOptions());

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
  //To readd
  // await emailService.sendRegisterEmail(user.email, user.username);
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, getCookieOptions());
  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
  try {
    // Clear the auth cookie to logout the user.
    // Always clear cookie on logout
    res.clearCookie("token", getCookieOptions());

    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : undefined);
    if (!token) {
      return res.status(200).json({ message: "User logged out successfully" });
    }

    try {
      await tokenBlackListModel.create({ token: token });
    } catch (err) {
      // Ignore duplicate key errors (token already blacklisted)
      if (err && err.code === 11000) {
        // already blacklisted - nothing to do
      } else {
        throw err;
      }
    }

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Logout failed" });
  }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
