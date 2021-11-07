const mongoose = require("mongoose");
// const validator = require("validator");

const propertySchema = mongoose.Schema({
  //name
  name: {
    type: String,
    required: [true, "Property name is required"],
  },
  //address
  address: {
    type: String,
    required: [true, "Property address is required"],
  },
  city: {
    type: String,
    required: [true, "City name is required"],
  },
  state: {
    type: String,
    required: [true, "State name is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
