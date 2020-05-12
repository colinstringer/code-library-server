const express = require("express");
const app = express();

const loggerMiddleWare = require("morgan");
app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

const authRouter = require("./routers/auth");
const librariesRouter = require("./routers/libraries");
const categoriesRouter = require("./routers/categories");
const pagesRouter = require("./routers/pages");
const examplesRouter = require("./routers/examples");
app.use("/", authRouter);
app.use("/", librariesRouter);
app.use("/", categoriesRouter);
app.use("/", pagesRouter);
app.use("/", examplesRouter);

const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
