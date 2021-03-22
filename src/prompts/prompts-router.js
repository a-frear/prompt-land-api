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
    const { username, prompt, tag_id=[] } = req.body;
    const newPrompt = { username, prompt };
    for (const [key, value] of Object.entries(newPrompt))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    PromptsService.insertPrompts(req.app.get("db"), newPrompt)
          .then((prompt) => {
          const promptId = prompt.id
          res
            .status(201)
            .location(`/api/prompts/${promptId}`)
            .json(serializePrompt(prompt));
            for (let i = 0; i < tag_id.length; i++) {
                let tagId = tag_id[i]
                TagsService.insertTags(req.app.get("db"), {promptId, tagId})
            .then(
              res.status(204)
            )
            }
            })
      // .then((prompt) => {
      //   console.log(prompt)
      //   //but what if there are multiple tag id's
      //   // const newPromptTag = [{prompt_id: prompt.id, tag_id}]
      //   //HERE IS MY EXPERIMENT: not working

      // })
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
