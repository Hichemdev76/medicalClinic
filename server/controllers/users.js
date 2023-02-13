import User from "../models/User.js";

/* READ*/
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isArchived: false }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUsersArchived = async (req, res) => {
  try {
    const users = await User.find({ isArchived: true }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const promoteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role: role });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const archivedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isArchived: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
