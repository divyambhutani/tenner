exports.getAllUsers = (req, res) => {
  res.status(200).send("success");
};

exports.createUser = (req, res) => {
  res.status(201).json({
    status: "success",
    message: "user created",
  });
};
