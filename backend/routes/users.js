const { User, validateLogin, validateUser } = require("../models/User");
const auth = require("../middleware/auth");
const CryptoJS = require("crypto-js");
const express = require("express");
const router = express.Router();


//* POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await CryptoJS.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await CryptoJS.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
//* POST a valid login attempt
//! when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) 
      return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send(`Invalid email or password.`);

    const validPassword = await CryptoJS.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// We need an endpoint that makes a firend request for a spcific user
//

// router.post('/friends/:userToBefriendId/request', [auth], async (req, res) => {
//   try{
//     const signedInUser = await User.findById(req.user._id);

//     const userToBefriend = await User.findById(req.params.userToBefriendId);

//     const friendRequest = new FriendRequest({
//       friendId: signedInUser._id
//     });
  
//     userToBefriend.friends.push(friendRequest);
  
//     await userToBefriend.save()
  
//     return res.send(userToBefriend);
//   } catch (ex) {
//     console.log(ex);
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }

// });

// router.put("/friends/:friendRequestId/accept", [auth], async (req, res) => {
//   try {
//     const signedInUser = await User.findById(req.user._id);

//     let friendRequest = signedInUser.friends.id(req.params.friendRequestId);

//     friendRequest.isAccepted = 'ACCEPTED';

//     await signedInUser.save()

//     return res.send(signedInUser);
    
//   } catch (err) {
//     console.log(err);
//       res.status(500).json(err);
// }
// }); 


// router.put("/friends/:friendRequestId/decline", [auth], async (req, res) => {
//   try {
//     const signedInUser = await User.findById(req.user._id);

//     let friendRequest = signedInUser.friends.id(req.params.friendRequestId);

//     friendRequest.isAccepted = 'DECLINED';

//     await signedInUser.save()

//     return res.send(signedInUser);
    
//   } catch (err) {
//       res.status(500).json(err);
// }
// }); 


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/current", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// router.get("/allfriends", [auth], async (req, res) => {
//   try {

//     const user = await User.findById(req.user._id);

//     const friendsObjects = []

//     for (let i =0; i< user.friends.length; i++){
//       if(user.friends[i].isAccepted == 'ACCEPTED'){
//         const aFriend = await User.findById(user.friends[i].friendId)
//         friendsObjects.push(aFriend);
//       }
//     }
    
//     return res.send(friendsObjects);

//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });
    
    // create an empty array

    // loop over the user.firends array
    
      // for each friend make an findById call 
    
      // add that friend object ot the empty array
    
    // return the array that is holding all of the firend user objects



router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.send(user);

});



//* DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;