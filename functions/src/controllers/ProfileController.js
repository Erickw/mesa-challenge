/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const admin = require("firebase-admin");
const db = admin.firestore();
const usersCollection = db.collection("users");

const User = require("../models/User");

class ProfileController {
  async index(req, res) {
    const id = req.params.id;
    try {
      const profile = await usersCollection.doc(id).get();
      return res.json({"User": new User(profile.data()).userInfo()});
    } catch (error) {
      return res.status(404).json({error: "User not found"});
    }
  }
}

module.exports = new ProfileController();
