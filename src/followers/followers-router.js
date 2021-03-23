const express = require("express");
const followersService = require("./followersService");
const followersRouter = express.Router();
const jsonParser = express.json();

followersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    followersService
      .getAllFollowers(knexInstance)
      .then((followers) => {
        res.json(followers);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { username, followee } = req.body;
    const newFollowing = { username, followee };

    for (const [key, value] of Object.entries(newFollowing))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body!` },
        });

    followersService
      .insertFollowing(req.app.get("db"), newFollowing)
      .then((followers) => {
        res.status(201).json(followers);
      })
      .catch(next);
  });

followersRouter.route("/all/:id").get((req, res, next) => {
  followersService
    .getAllByUsername(req.app.get("db"), req.params.id)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

followersRouter
  .route("/:id")
  .all((req, res, next) => {
    followersService
      .getByUsername(req.app.get("db"), req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: { message: `user does not exist` },
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.user);
  })
  .delete((req, res, next) => {
    followersService
      .deleteFollowing(req.app.get("db"), req.params.id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = followersRouter;
