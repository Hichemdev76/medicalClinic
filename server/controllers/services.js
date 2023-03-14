import Service from "../models/Service.js";
import User from "../models/User.js";

export const getService = async (req, res) => {
  try {
    const { name } = req.params;
    const service = await Service.findOne({ name: name });

    let head = await User.findById(service.head).select("-password");

    const allUsers = await User.find({
      _id: { $in: service.workersIds },
    }).select("-password");
    res.status(200).json({ service, head, allUsers });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().select("-workersIds");
    res.status(200).json(services);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "No user found" });

    if (role === "user") {

      let updatedService = await Service.findOneAndUpdate(
        { name: name },
        {
          $push: { workersIds: user._id },
        }
      );
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { affiliation: name }
      );
      return res.status(200).json(updatedService);
    }


    const service = await Service.findOne({ name: name });
    if (!service) return res.status(404).json({ message: "No service found" });

    await User.findByIdAndUpdate(service.head, {
      role: "user",
    });

    const newHead = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: "serviceChef", affiliation: name }
    );
    if (!newHead) return res.status(404).json({ message: "No user found" });

    const updatedService = await Service.findOneAndUpdate(
      { name: name },
      {
        $set: { head: newHead._id },
        $push: { workersIds: newHead._id },
      }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addService = async (req, res) => {
  try {
    const { name, email } = req.body;

    const userToUpdate = await User.findOne({ email: email.toLowerCase() });
    console.log(userToUpdate);
    if (userToUpdate.role !== "user")
      return res
        .status(400)
        .json({ msg: "User is already assigned to a role" });

    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      { role: "serviceChef", affiliation: name }
    );
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const users = await User.find({ affiliation: name }).select("-password");
    if (!users) return res.status(400).json({ msg: "User does not exist." });

    let usersIds = users.map((user) => user._id);

    const newService = new Service({
      name,
      head: user._id,
      workersIds: usersIds,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
