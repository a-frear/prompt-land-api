require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const promptsRouter = require("./prompts/prompts-router");
const tagsRouter = require("./tags/tags-router");
const followersRouter = require("./followers/followers-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/prompts", promptsRouter);

app.use("/api/tags", tagsRouter);

app.use("/api/followers", followersRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

module.exports = app;
