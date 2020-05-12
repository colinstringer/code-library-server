const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Library = require("../models/").library;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "ASC"]],
    });

    users.map((user) => {
      delete user.dataValues["password"];
    });

    return res.status(200).send(users);
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  return res.status(200).send({ ...req.user.dataValues });
});

router.delete("/me", authMiddleware, async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.user.id,
      },
    });
    return res
      .status(200)
      .send({ message: "the user was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.delete("/user", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send("please provide user id in req body");

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) res.status(400).send({ message: "this user doesn't exist" });

    await User.destroy({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .send({ message: "the user was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide an username, password and a name" });
  }

  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
    });
    await Library.create({
      userId: newUser.id,
    });

    delete newUser.dataValues["password"];

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this username" });
    }

    return res
      .status(500)
      .send({ message: "Something went wrong within the server" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both username and password" });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).send({
        message: "User with that username not found",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "password incorrect",
      });
    }

    delete user.dataValues["password"];
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
