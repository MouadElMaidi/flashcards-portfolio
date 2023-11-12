const express = require("express");

const setsController = require("../controllers/sets");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /sets
router.get("/", isAuth, setsController.getSets);

// GET /sets/:setId
router.get("/:setId", isAuth, setsController.getSet);

// POST /sets/new-set
router.post("/new-set", isAuth, setsController.createSet);

// PUT /sets/edit-set/:setId
router.put("/edit-set/:setId", isAuth, setsController.updateSet);

// DELETE /sets/delete-set
router.delete("/delete-set/:setId", isAuth, setsController.deleteSet);

// POST /sets/add-card/:setId
// router.post("/add-card/:setId", setsController.addCard);

// DELETE /sets/delete-card/:setId/:cardId
// router.delete("/delete-card/:setId/:cardId", isAuth, setsController.deleteCard);

module.exports = router;
