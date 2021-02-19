/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
const db = admin.firestore();

const customId = require("custom-id");
const Comment = require("../models/Comment");

class CommentController {
  async index(req, res) {
    const placeId = req.params.id;
    const commentsCollection = db.collection(`places/${placeId}/comments`);
    const snapshot = await commentsCollection.get();
    const comments = [];

    if (snapshot.empty) {
      return res.status(400).json({error: "Error to get comment. No matching documents."});
    }

    snapshot.forEach((doc) => {
      comments.push(new Comment(doc.data()).commentInfo());
    });

    return res.json(comments);
  }

  async store(req, res) {
    const comment = req.body;
    const placeId = req.params.id;
    const id = customId({});

    const placeSnapshot = db.collection(`places/${placeId}/comments`);
    comment.id = id;

    await placeSnapshot.doc(id).set(new Comment(comment).commentInfo()).catch((e) => console.log("Error: ", e.message));
    return res.json({message: `Comment add on database with success, ${comment.id}`});
  }

  async delete(req, res) {
    const {placeId, commentId} = req.body;
    const commentsSnapshot = await db.collection(`places/${placeId}/comments`).doc(commentId).get();

    if (commentsSnapshot.empty) {
      return res.status(400).json({error: "Error to delete comment. No matching documents."});
    }

    commentsSnapshot.ref.delete();

    return res.json({message: "Comment deleted with success"});
  }
}

module.exports = new CommentController();
