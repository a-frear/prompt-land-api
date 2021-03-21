require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const promptsRouter = require("./prompts/prompts-router");
const tagsRouter = require("./tags/tags-router");
const usersRouter = require("./users/users-router");
const followersRouter = require("./followers/followers-router");
const savedPromptsRouter = require("./savedPrompts/saved-prompts-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
      origin: "http://localhost:3000"
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/prompts", promptsRouter);

app.use("/api/tags", tagsRouter);

app.use("/api/users", usersRouter);

app.use("/api/followers", followersRouter);

app.use("/api/saved-prompts", savedPromptsRouter);

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
