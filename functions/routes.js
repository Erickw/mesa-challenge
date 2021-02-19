const {Router} = require("express");

const userController = require("./src/controllers/UserController");
const commentsController = require("./src/controllers/CommentController");
const ratingsController = require("./src/controllers/RatingController");
const sessionsController = require("./src/controllers/SessionController");
const profilesController = require("./src/controllers/ProfileController");
const placesController = require("./src/controllers/PlaceController");
const mapController = require("./src/controllers/MapController");
const authMiddleware = require("./src/middlewares/auth");

const routes = new Router();

// Session
routes.post("/sessions/", sessionsController.store);

// Users
routes.post("/users", userController.store);

// Auth middleware
routes.use(authMiddleware);

// Users
routes.get("/users", userController.index);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.delete);

// Profile
routes.get("/profile/:id", profilesController.index);

// Comments
routes.get("/comments/place/:id", commentsController.index);
routes.post("/comments/place/:id", commentsController.store);
routes.delete("/comments/", commentsController.delete);

// Ratings
routes.get("/ratings/place/:id", ratingsController.index);
routes.post("/ratings/place/:id", ratingsController.store);
routes.delete("/ratings/", ratingsController.delete);

// Places
routes.get("/places", placesController.index);
routes.post("/places", placesController.store);
routes.delete("/places/:id", placesController.delete);

// Map
routes.get("/map/:id", mapController.index);


module.exports = routes;
