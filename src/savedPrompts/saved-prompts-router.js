const express = require("express");
const SavedPromptsService = require("./savedPromptsService");
const savedPromptsRouter = express.Router();
const jsonParser = express.json();

savedPromptsRouter
  .route("/")

  .post(jsonParser, (req, res, next) => {
    const { user, prompt_id } = req.body;
    const newSaved = { user, prompt_id };

    for (const [key, value] of Object.entries(newSaved))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    SavedPromptsService.insertSavedPrompt(req.app.get("db"), newSaved)
      .then((prompt) => {
        res
          .status(201)
          .location(`/api/saved-prompts/${prompt.id}`)
          .json(prompt);
      })
      .catch(next);
  });

savedPromptsRouter
  .route("/:user")
  .all((req, res, next) => {
    SavedPromptsService.getByUser(req.app.get("db"), req.params.user)
      .then((prompt) => {
        if (!prompt) {
          return res.status(404).json({
            error: { message: `Prompt does not exist` },
          });
        }
        res.prompt = prompt;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.prompt);
  });

savedPromptsRouter
  .route("/:id")
  .all((req, res, next) => {
    SavedPromptsService.getById(req.app.get("db"), req.params.id)
      .then((prompt) => {
        if (!prompt) {
          return res.status(404).json({
            error: { message: `Prompt does not exist` },
          });
        }
        res.prompt = prompt;
        next();
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    SavedPromptsService.deleteSavedPrompt(req.app.get("db"), req.params.id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = savedPromptsRouter;
