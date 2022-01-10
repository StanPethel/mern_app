const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require('dotenv').config();



// const friendSchema = mongoose.Schema({
//   friendId: { type: mongoose.Schema.Types.ObjectId },
//   isAccepted: { type: String, default: 'PENDING' }
// })

const userSchema = mongoose.Schema({

  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  friends: { type: [friendSchema], ref: 'Friends'},
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  isAdmin: { type: Boolean, default:false},
  posts: { type: [ postSchema ]}

});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      
    }, 
    config.get("JWT_SECRET")
  );
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

const User = mongoose.model("User", userSchema);
//const FriendRequest = mongoose.model("FriendRequest", friendSchema);




module.exports.User = User;
//module.exports.FriendRequest = FriendRequest;

module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;