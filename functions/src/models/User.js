/* eslint-disable require-jsdoc */
class User {
  constructor(payload) {
    // this.id = payload.id;
    this.name = payload.name || "";
    this.email = payload.email || "";
  }

  userInfo() {
    return {
      // id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

module.exports = User;
