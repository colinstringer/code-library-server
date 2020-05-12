const { Router } = require("express");
const Example = require("../models/").example;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/examples", authMiddleware, async (req, res) => {
  try {
    const examples = await Example.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).send(examples);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

router.post("/example", authMiddleware, async (req, res) => {
  const { codeblock, output, codeWidth, sequence, pageId } = req.body;

  if (!codeblock || !output) {
    return res
      .status(400)
      .send({ message: "Please enter both textfields" });
  }

  if (!pageId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const newExample = await Example.create({
      codeblock,
      output,
      codeWidth: 6,
      sequence: 1,
      pageId,
    });
    return res.status(200).send(newExample);
  } catch (error) {
    console.error("Error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

// router.patch("/example", authMiddleware, async (req, res) => {
//   const { exampleId, name } = req.body;
//   if (!pageId || !name) {
//     return res.status(400).send("Something went wrong with the input, sorry");
//   }

//   try {
//     const page = await Page.findByPk(pageId);

//     await page.update({ name });

//     return res.status(200).send({ message: "page updated successfully" });
//   } catch (error) {
//     console.error("Error message: ", error.message);
//     return res
//       .status(500)
//       .send({ message: "something went wrong within the server" });
//   }
// });

router.delete("/example", authMiddleware, async (req, res) => {
  const { exampleId } = req.body;
  if (!exampleId) {
    return res
      .status(400)
      .send({ message: "Something went wrong with the input, sorry" });
  }

  try {
    const destroyedExample = await Example.destroy({
      where: {
        id: exampleId,
      },
    });

    if (destroyedExample == 0) {
      return res
        .status(200)
        .send({ message: "there is no example with this input" });
    }

    return res
      .status(200)
      .send({ message: "the example was deleted successfully" });
  } catch (error) {
    console.error("error message: ", error.message);
    return res
      .status(500)
      .send({ message: "something went wrong within the server" });
  }
});

module.exports = router;
