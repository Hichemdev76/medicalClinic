import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Service from "../models/Service.js";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      dateOfBirth,
      address,
      status,
      sex,
      level,
      jobTitle,
      affiliation,
      email,
      password,
      picturePath,
      isArchived,
      payedLeaveDaysLeft,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    let mail = email.toLowerCase()    
    const newUser = new User({
      role,
      firstName,
      lastName,
      dateOfBirth,
      address,
      status,
      level,
      sex,
      jobTitle,
      affiliation,
      email: mail,
      password: passwordHash,
      picturePath,
      isArchived,
      payedLeaveDaysLeft,
    });
    const savedUser = await newUser.save();
    console.log(savedUser)
    if (savedUser && savedUser.affiliation !== "") {
      await Service.findOneAndUpdate(
        { name: affiliation },
        {
          $push: { workersIds: savedUser._id },
        }
      );
    }
    res.status(201).json({ savedUser, done: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN IN */
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (!user|| user.isArchived|| user.role==="user") return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
