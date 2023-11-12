const Set = require("../models/set");
const Card = require("../models/card");

exports.getSets = async (req, res, next) => {
  const sets = await Set.findAll();
  res.send(sets);
};

exports.getSet = async (req, res, next) => {
  const setId = req.params.setId;
  const set = await Set.findByPk(setId, { include: Card });
  res.send(set);
};

exports.createSet = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const cards = req.body.cards;

  const newSet = await Set.create(
    { title: title, description: description },
    { include: Card }
  );

  for (let card of cards) {
    const newCard = await Card.create({
      question: card.question,
      answer: card.answer,
    });
    await newSet.addCard(newCard);
  }

  res.send(newSet);
};

exports.updateSet = async (req, res, next) => {
  const setId = req.params.setId;
  const title = req.body.title;
  const description = req.body.description;
  const cards = req.body.cards;

  const setToUpdate = await Set.findByPk(setId);

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

  res.send("update");
};

exports.deleteSet = async (req, res, next) => {
  const setId = req.params.setId;
  const set = await Set.findByPk(setId);
  const result = await set.destroy();
  res.send(result);
};

exports.deleteCard = async (req, res, next) => {
  // const setId = req.params.setId;
  const cardId = req.params.cardId;
  // const set = await Set.findByPk(setId);
  const cardToDelete = await Card.findByPk(cardId);
  const result = await cardToDelete.destroy();
  res.send(cardToDelete);
};
