const { Router } = require("express");
const User = require("../models/").user;
const Library = require("../models/").library;
const Category = require("../models/").category;
const Page = require("../models/").page;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get(`/library/:username`, async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const library = await User.findOne({
      where: { username: username },
      include: [
        {
          model: Library,
          include: [
            {
              model: Category,
              include: [
                {
                  model: Page,
                },
              ],
            },
          ],
        },
      ],
      attributes: ["username"],
      order: [
        [Library, Category, "name", "ASC"],
        [Library, Category, Page, "name", "ASC"],
      ],
    });

    return res.status(200).send(library);
  } catch (error) {
    console.error("error message: ", error.message);

    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.get("/libraries", async (req, res) => {
  try {
    const libraries = await Library.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).send(libraries);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.post("/library", authMiddleware, async (req, res) => {
  try {
    const newLibrary = await Library.create({
      userId: req.user.id,
    });

    return res.status(200).send(newLibrary);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.delete("/library", authMiddleware, async (req, res) => {
  const { libraryId } = req.body;
  if (!libraryId) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }

  try {
    const destroyedLibrary = await Library.destroy({
      where: {
        id: libraryId,
      },
    });

    if (destroyedLibrary == 0) {
      return res
        .status(200)
        .send({ message: "there is no library with this input" });
    }

    return res
      .status(200)
      .send({ message: "the library was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

module.exports = router;
