const express = require("express");
const xss = require("xss");
const PromptsService = require("./promptsService");
const promptsRouter = express.Router();
const jsonParser = express.json();
const TagsService = require("../tags/tagsService")

const serializePrompt = (prompt) => ({
  id: prompt.id,
  username: xss(prompt.username),
  prompt: xss(prompt.prompt),
  modified: prompt.modified,
  tags: prompt.tags,
});

promptsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    PromptsService.getAllPrompts(knexInstance)
      .then((prompts) => {
        res.json(prompts.map(serializePrompt));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { username, prompt, tag_id } = req.body;
    const newPrompt = { username, prompt };
    for (const [key, value] of Object.entries(newPrompt))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    PromptsService.insertPrompts(req.app.get("db"), newPrompt)
      .then((prompt) => {
        console.log(prompt)
        //but what if there are multiple tag id's
        const newPromptTag = [{prompt_id: prompt.id, tag_id}]
        newPromptTag.map((pt)=> { TagsService.insertTags(req.app.get("db"), newPromptTag)
        .then((promptTag) => {
        console.log(promptTag)
        res
          .status(201)
          .location(`/api/prompts/${prompt.id}`)
          .json(serializePrompt(prompt));
      })})
      })
      .catch(next);
  });

promptsRouter
  .route("/:prompt_id")
  .all((req, res, next) => {
    PromptsService.getById(req.app.get("db"), req.params.prompt_id)
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
    res.json(serializePrompt(res.prompt));
  })
  .delete((req, res, next) => {
    PromptsService.deletePrompt(req.app.get("db"), req.params.prompt_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = promptsRouter;
