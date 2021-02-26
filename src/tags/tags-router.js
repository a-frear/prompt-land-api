const express = require('express')
const xss = require('xss')
const TagsService = require('./TagsService')
const tagsRouter = express.Router()

const serializeTag = tag => ({
    id: tag.id,
    tagTitle: xss(tag.tagtitle)
  })

tagsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TagsService.getAllTags(knexInstance)
            .then(tags => {
              res.json(tags.map(serializeTag))
            })
            .catch(next)
            //passing next into the .catch from the promise chain so that any errors get handled by our error handler middleware.
      })

tagsRouter
      .route('/:tag_id')
      .all((req, res, next) => {
        TagsService.getById(
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
              res.json(serializeTag(res.prompt))
            })

module.exports = tagsRouter