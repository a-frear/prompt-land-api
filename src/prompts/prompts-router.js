const express = require('express')
const xss = require('xss')
const PromptsService = require('./promptsService')
const promptsRouter = express.Router()
const jsonParser = express.json()

// const tagsForPrompts = id => {
//   const tagsArray = []
//   promptsRouter
//   .route('/')
//   .get((req, res, next) => {
//   PromptsService.addTags(req.app.get('db'), id)
//     .then(tags => {
//       res(tagsArray.push(tags))
//     })
//     .catch(next)
//   })
//   return tagsArray
// }


const serializePrompt = prompt => ({
    id: prompt.id,
    username: xss(prompt.username),
    prompt: xss(prompt.prompt),
    modified: prompt.modified,
    tags: prompt.tag_title
    // tags: tagsForPrompts(prompt.id)
  })

promptsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PromptsService.getAllPrompts(knexInstance)
            .then(prompts => {
              //I need to create a prompt for each specific prompt id
              //and create an array of tags to push onto tags in the serialized prompt?
              res.json(prompts.map(serializePrompt))
            })
            .catch(next)
      })
      .post(jsonParser, (req, res, next) => {
        const { username, prompt } = req.body
        const newPrompt = { username, prompt }

        for (const [key, value] of Object.entries(newPrompt))
        if (value == null)
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
          })

        PromptsService.insertPrompts(
          req.app.get('db'),
          newPrompt
        )
          .then(prompt => {
            res
              .status(201)
              .location(`/api/prompts/${prompt.id}`)
              .json(serializePrompt(prompt))
          })
          .catch(next)
      })

promptsRouter
      .route('/:prompt_id')
      .all((req, res, next) => {
        PromptsService.getById(
            req.app.get('db'), 
            req.params.prompt_id
            )
            .then(prompt => {
              if(!prompt){
                return res.status(404).json({
                  error: { message: `Prompt does not exist`}
                })
              }
              res.prompt = prompt
              next()
            })
            .catch(next)
      })
      .get((req, res, next) => {
              res.json(serializePrompt(res.prompt))
            })
      .delete((req, res, next) => {
        PromptsService.deletePrompt(
          req.app.get('db'),
          req.params.prompt_id
        )
          .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
      })

module.exports = promptsRouter