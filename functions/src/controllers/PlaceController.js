/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
const db = admin.firestore();
const placesCollection = db.collection("places");

const customId = require("custom-id");
const Place = require("../models/Place");

class PlaceController {
  async index(req, res) {
    const snapshot = await placesCollection.get();
    const places = [];

    if (snapshot.empty) {
      return res.status(400).json({error: "Error to get place. No matching documents."});
    }

    snapshot.forEach((doc) => {
      places.push(new Place(doc.data()).placeInfo());
    });

    const sorted = places.sort((a, b) => (a.name > b.name) ? 1 : -1);

    return res.json(sorted);
  }

  /**
   * @param reference must be an object array with the distance from the places to the another locations
   * Example: [ {"name": "PlaceB", "distance": 3},
                {"name": "PlaceC", "distance": 4},
                {"name": "PlaceD", "distance": 6}]
   */

  async store(req, res) {
    const id = customId({});
    const {name, userId, references} = req.body;

    await placesCollection.doc(id).set(new Place({name, userId, references}).placeInfo()).catch((e) => console.log("Error: ", e.message));
    return res.json({message: `Place add on database with success, ${name}`});
  }

  async delete(req, res) {
    const {placeId} = req.body;
    const placesSnapshot = await placesCollection.doc(placeId).get();

    if (placesSnapshot.empty) {
      return res.status(400).json({error: "Error to delete place. No matching documents."});
    }

    placesSnapshot.ref.delete();

    return res.json({message: "Place deleted with success"});
  }
}

module.exports = new PlaceController();
