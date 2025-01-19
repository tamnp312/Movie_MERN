import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../middlewares/GenerateToken.js";

const register = async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, image });

    const saveUser = await newUser.save();

    if (saveUser) {
      res.status(201).json({
        success: true,
        error: false,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "User registration failed",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {

      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid password",
      });

    } else {

      return res.status(200).json({
        success: true,
        error: false,
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export { register, login };
