const { Router } = require("express");
const Category = require("../models/").category;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).send(categories);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.post("/category", authMiddleware, async (req, res) => {
  const { name, libraryId } = req.body;
  if (!name || !libraryId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const newCategory = await Category.create({
      name,
      libraryId,
    });

    return res.status(200).send(newCategory);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.patch("/category", authMiddleware, async (req, res) => {
  const { categoryId, name } = req.body;
  if (!categoryId || !name) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const category = await Category.findByPk(categoryId);

    await category.update({ name });

    return res.status(200).send({ message: "category updated successfully" });
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.delete("/category", authMiddleware, async (req, res) => {
  const { categoryId } = req.body;
  if (!categoryId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const destroyedCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    if (destroyedCategory == 0) {
      return res
        .status(200)
        .send({ message: "there is no category with this input" });
    }

    return res
      .status(200)
      .send({ message: "the category was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

module.exports = router;
