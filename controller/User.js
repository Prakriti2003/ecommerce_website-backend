const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).exec();
    delete user.password;
    delete user.salt;
    res.status(200).json(user);
    console.log(`User fetched successfully: ${user}`);
  } catch (err) {
    res.status(400).json(err);
    console.error(`Error fetching user by ID ${id}:`, err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
