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
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    // console.log(page, pageSize, sort, search);
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const users = await User.find({
      isArchived: false,
      $or: [
        { lastName: { $regex: new RegExp(search, "i") } },
        { firstName: { $regex: new RegExp(search, "i") } },
        { affiliation: { $regex: new RegExp(search, "i") } },
      ],
    })
      .select("-password")
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await User.countDocuments({
      isArchived: false,
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json({users, total});
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isArchived: false }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newUpdates = req.body;
    await User.findByIdAndUpdate(id, newUpdates);
    const user = await User.findById(id).select("-password");
    console.log("server", user);
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
