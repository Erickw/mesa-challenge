/* eslint-disable require-jsdoc */
class Rating {
  constructor(payload) {
    // this.id = payload.id;
    this.userId = payload.userId || "",
    this.score = payload.score || "";
  }

  ratingInfo() {
    return {
      // id: this.id,
      userId: this.userId,
      score: this.score,
    };
  }
}

module.exports = Rating;
