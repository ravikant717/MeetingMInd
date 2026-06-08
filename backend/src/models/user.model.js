const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required for creating an account"],
    },
    email: {
      type: String,
      required: [true, "Email is required for creating an account"],
      trim: true,
      unique: [true, "Email already exists"],
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email Address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minLength: [6, "Password should contain more than 6 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

//Whenever document changes
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
