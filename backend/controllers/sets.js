const { validationResult } = require("express-validator");

const Set = require("../models/set");
const Card = require("../models/card");
const User = require("../models/user");

exports.getSets = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const sets = await user.getSets();

    if (!sets) {
      const error = new Error("Could not find your sets.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched sets successfully.",
      sets: sets,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getSet = async (req, res, next) => {
  const setId = req.params.setId;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const sets = await user.getSets({
      where: { id: setId },
      include: [{ model: Card }],
    });

    if (!sets) {
      const error = new Error("Could not find set.");
      error.statusCode = 404;
      throw error;
    }

    const singleSet = sets[0];

    res.status(200).json({ message: "Post fetched.", set: singleSet });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createSet = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }
  const title = req.body.title;
  const description = req.body.description;
  const cards = req.body.cards;
  // const userId = req.userId;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const newSet = await Set.create({
      title: title,
      description: description,
      userId: req.userId,
    });

    for (let card of cards) {
      const newCard = await Card.create({
        question: card.question,
        answer: card.answer,
      });
      await newSet.addCard(newCard);
    }

    res.status(201).json({
      message: "Set created successfully!",
      set: newSet,
      creator: { id: user.id, username: user.username },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateSet = async (req, res, next) => {
  const setId = req.params.setId;
  const title = req.body.title;
  const description = req.body.description;
  const cards = req.body.cards;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const sets = await user.getSets({ where: { id: setId } });

    if (!sets) {
      const error = new Error("Could not find your set.");
      error.statusCode = 404;
      throw error;
    }

    const setToUpdate = sets[0];

    await Card.destroy({
      where: {
        setId: setId,
      },
    });

    setToUpdate.update({ title: title, description: description });

    for (let card of cards) {
      const newCard = await Card.create({
        question: card.question,
        answer: card.answer,
      });
      await setToUpdate.addCard(newCard);
    }

    res.status(200).json({ message: "Post updated!", set: setToUpdate });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteSet = async (req, res, next) => {
  const setId = req.params.setId;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    const sets = await user.getSets({ where: { id: setId } });

    if (!sets) {
      const error = new Error("Could not find your set.");
      error.statusCode = 404;
      throw error;
    }

    const setToDelete = sets[0];

    await setToDelete.destroy();

    res.status(200).json({ message: "Deleted set." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// exports.deleteCard = async (req, res, next) => {
//   const setId = req.params.setId;
//   const cardId = req.params.cardId;

//   const user = await User.findByPk(req.userId);

//   const sets = await user.getSets({ where: { id: setId } });
//   const set = sets[0];
//   const cards = await set.getCards({ where: { id: cardId } });

//   const cardToDelete = cards[0];

//   const result = await cardToDelete.destroy();

//   res.send(result);
// };
