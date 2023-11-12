const express = require("express");

const setsController = require("../controllers/sets");

const router = express.Router();

// GET /sets
router.get("/", setsController.getSets);

// GET /sets/:setId
router.get("/:setId", setsController.getSet);

// POST /sets/new-set
router.post("/new-set", setsController.createSet);

// PUT /sets/edit-set/:setId
router.put("/edit-set/:setId", setsController.updateSet);

// DELETE /sets/delete-set
router.delete("/delete-set/:setId", setsController.deleteSet);

// POST /sets/add-card/:setId
// router.post("/add-card/:setId", setsController.addCard);

// DELETE /sets/delete-card/:setId/:cardId
router.delete("/delete-card/:cardId", setsController.deleteCard);

module.exports = router;
