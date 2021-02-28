const express = require('express')
const TagsService = require('./TagsService')
const tagsRouter = express.Router()
const jsonParser = express.json()

tagsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
      const { tag_id, prompt_id } = req.body
      const newPromptTag = { tag_id, prompt_id }

      for (const [key, value] of Object.entries(newPromptTag))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      TagsService.insertTags(
        req.app.get('db'),
        newPromptTag
      )
      .then(
        res
          .status(201)
          .json(res.json)
      )
      .catch(next)
  })



tagsRouter
      .route('/:tag_id')
      .all((req, res, next) => {
        TagsService.getTagById(
            req.app.get('db'), 
            req.params.tag_id
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
              res.json(res.prompt)
            })

module.exports = tagsRouter