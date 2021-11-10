const Property = require("../models/propertyModel");
const catchError = require("../utils/catchError");

// create Property
exports.createProperty = catchError(async (req, res, next) => {
  const property = await Property.create(req.body);
  res.status(200).json({
    status: "success",
    message: property,
  });
});

// read all properties
exports.getAllProperties = catchError(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({
    status: "success",
    length: properties.length,
    message: properties,
  });
});
// read one property by id
exports.getProperty = catchError(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: property,
  });
});

//update
exports.updateProperty = catchError(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: property,
  });
});

//delete
exports.deleteProperty = catchError(async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "Property is deleted",
  });
});
