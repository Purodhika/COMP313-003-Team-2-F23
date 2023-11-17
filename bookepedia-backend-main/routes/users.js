const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Book = require("../models/book.js")

//Creating one user
router.post("/register/", async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  });
  console.log(user);
  try {

    //let exists = 'ss'
    let exists = await User.findOne({ email: user.email});
    if (exists == null) {
      const newUser = await user.save();
      res.status(201).json({message:'success'});
    }
    else {
      res.status(201).json({message:'exists'});
    }


    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/listings", async (req, res) => {
  try {
    const users = await Book.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//update a user
router.patch("/:email", getUserByEmail, async (req, res) => {
  if (req.body.fname != null) {
    res.user.fname = req.body.fname;
  }

  if (req.body.lname != null) {
    res.user.lname = req.body.lname;
  }

  if (req.body.userType != null) {
    res.user.userType = req.body.userType;
  }

  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete user
router.delete("/:email", getUserByEmail, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//finding user by email
router.get("/:email", getUserByEmail, (req, res) => {
  res.json(res.user);
});

//generic function get user by email
async function getUserByEmail(req, res, next) {
  let user;
  try {
    user = await User.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ message: "Cannot find user " + req.params.email });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.user = user;
  next();
}

module.exports = router;
