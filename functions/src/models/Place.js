/* eslint-disable require-jsdoc */
class Place {
  constructor(payload) {
    this.userId = payload.userId || "",
    this.name = payload.name || "";
    this.references = payload.references || "";
  }

  placeInfo() {
    return {
      userId: this.userId,
      name: this.name,
      references: this.references,
    };
  }
}

module.exports = Place;
