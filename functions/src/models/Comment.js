/* eslint-disable require-jsdoc */
class Comment {
  constructor(payload) {
    this.userId = payload.userId || "",
    this.message = payload.message || "";
  }

  commentInfo() {
    return {
      userId: this.userId,
      message: this.message,
    };
  }
}

module.exports = Comment;
