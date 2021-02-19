/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
const db = admin.firestore();

const customId = require("custom-id");
const Rating = require("../models/Rating");

class RatingController {
  async index(req, res) {
    const placeId = req.params.id;
    const ratingsCollection = db.collection(`places/${placeId}/ratings`);
    const snapshot = await ratingsCollection.get();
    const ratings = [];

    if (snapshot.empty) {
      return res.status(400).json({error: "Error to get rating. No matching documents."});
    }

    snapshot.forEach((doc) => {
      ratings.push(new Rating(doc.data()).ratingInfo());
    });

    return res.json(ratings);
  }

  async store(req, res) {
    const rating = req.body;
    const placeId = req.params.id;
    const id = customId({});

    const placeSnapshot = db.collection(`places/${placeId}/ratings`);
    rating.id = id;

    await placeSnapshot.doc(id).set(new Rating(rating).ratingInfo()).catch((e) => console.log("Error: ", e.message));
    return res.json({message: `Rating add on database with success, ${rating.id}`});
  }


  async delete(req, res) {
    const {placeId, ratingId} = req.body;
    const ratingsSnapshot = await db.collection(`places/${placeId}/ratings`).doc(ratingId).get();

    if (ratingsSnapshot.empty) {
      return res.status(400).json({error: "Error to delete rating. No matching documents."});
    }

    ratingsSnapshot.ref.delete();

    return res.json({message: "Rating deleted with success"});
  }
}

module.exports = new RatingController();
