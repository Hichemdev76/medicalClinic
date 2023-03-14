import User from "../models/User.js";
import Leave from "../models/Leave.js";

export const addLeave = async (req, res) => {
  try {
    const {
      id,
      email,
      expirationDate,
      creator,
      leaveCause,
      startingDate,
      nbrOfDays,
      type,
    } = req.body;

    const newLeave = new Leave({
      userId: id,
      creatorId: creator,
      leaveCause,
      startingDate: startingDate,
      expirationDate: expirationDate,
      nbrOfDays,
      type,
    });
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const leaveUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id);
    const user = await User.findById(leave.userId);
    
    if (status === "accepted" && leave.type === "paid") {
      let daysLeft = user.payedLeaveDaysLeft - leave.nbrOfDays;
      await User.findByIdAndUpdate(leave.userId, {
        payedLeaveDaysLeft: daysLeft,
      });
      await Leave.findByIdAndUpdate(id, { status: status });
    } else await Leave.findByIdAndUpdate(id, { status: status });

    res.status(201).json({ leave, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const leave = await Leave.findById(id);
    const user = await User.findById(leave.userId);
   // TODO: get creator by leave.creatorId and add it to the response
    res.status(201).json({leave,user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeaveList = async (req, res) => {
  try {
    const leaveList = await Leave.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
    ]);
    res.status(201).json(leaveList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
