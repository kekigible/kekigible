import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    maxlength: [20, "name cant be more than 20 characters"],
  },

  lastname: {
    type: String,
    required: [true, "first name is required"],
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

  phonenumber: {
    type: Number,
  },
});

export { UserSchema };
export default mongoose.model("User", UserSchema);
