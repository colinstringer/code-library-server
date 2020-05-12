const { Router } = require("express");
const Page = require("../models/").page;
const Example = require("../models/").example;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/current-page/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }

  try {
    const currentPage = await Page.findOne({
      where: { id },
      include: [
        {
          model: Example,
          order: [["createdAt", "ASC"]],
        },
      ],
    });

    return res.status(200).send(currentPage);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.get("/pages", authMiddleware, async (req, res) => {
  try {
    const pages = await Page.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).send(pages);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.post("/page", authMiddleware, async (req, res) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const newPage = await Page.create({
      name,
      categoryId,
    });

    return res.status(200).send(newPage);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.patch("/page", authMiddleware, async (req, res) => {
  const { pageId, name } = req.body;
  if (!pageId || !name) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const page = await Page.findByPk(pageId);

    await page.update({ name });

    return res.status(200).send({ message: "page updated successfully" });
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.delete("/page", authMiddleware, async (req, res) => {
  const { pageId } = req.body;
  if (!pageId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const destroyedPage = await Page.destroy({
      where: {
        id: pageId,
      },
    });

    if (destroyedPage == 0) {
      return res
        .status(200)
        .send({ message: "there is no page with this input" });
    }

    return res
      .status(200)
      .send({ message: "the page was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

module.exports = router;
