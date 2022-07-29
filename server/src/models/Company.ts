import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const CompanySchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [20, "name cant be more than 20 characters"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  phoneNumber: Number,
});

export default mongoose.model("Company", CompanySchema);
