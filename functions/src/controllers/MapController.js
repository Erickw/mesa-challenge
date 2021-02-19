/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
const db = admin.firestore();
const placesCollection = db.collection("places");

class MapController {
  async index(req, res) {
    const id = req.params.id;
    const place = await placesCollection.doc(id).get();

    const sorted = place.data().references.sort((a, b) =>
                    (a.distance > b.distance) ? 1 : -1);

    return res.json(sorted);
  }
}

module.exports = new MapController();
