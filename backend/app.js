const express = require("express");

const sequelize = require("./util/database");
const Set = require("./models/set");
const Card = require("./models/card");
const User = require("./models/user");

const app = express();

const setsRoutes = require("./routes/sets");
const authRoutes = require("./routes/auth");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/sets", setsRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

Card.belongsTo(Set, { constraints: true, onDelete: "CASCADE" });
Set.hasMany(Card);
Set.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Set);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(8080);
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
