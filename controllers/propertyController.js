const Property = require("../models/propertyModel");

// create Property
exports.createProperty = async (req, res) => {
  await Property.create(req.body);
  res.status(200).json({
    status: "success",
    message: "Property registered",
  });
};

// read all properties
exports.getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.status(200).json({
    status: "success",
    length: properties.length,
    message: properties,
  });
};
// read one property by id
exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: property,
  });
};

//update
exports.updateProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: property,
  });
};

//delete
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Property is deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
