const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makePromptsArray, authToken } = require("./prompts.fixtures");
const { makeTagsArray, makePromptTagsArray } = require("./tags.fixtures");
const { makeSavedPromptsArray } = require("./saved-prompts.fixtures");

describe("Saved Prompts Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE prompts, tags, prompt_tag, saved_prompts RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE prompts, tags, prompt_tag, saved_prompts RESTART IDENTITY CASCADE"
    )
  );

  //   describe(`GET /saved-prompts`, () => {
  //     context("Given there are no prompts in the database", () => {
  //       it(`responds with 200 and an empty list`, () => {
  //         return supertest(app).get("/api/saved-prompts").expect(200, []);
  //       });
  //     });
  //     context("Given there are saved prompts in the database", () => {
  //       const testPrompts = makePromptsArray();
  //       const testTags = makeTagsArray();
  //       const testPromptTags = makePromptTagsArray();
  //       const testSavedPrompts = makeSavedPromptsArray();

  //       beforeEach("insert prompts", () => {
  //         return db
  //           .into("prompts")
  //           .insert(testPrompts)
  //           .then(() => {
  //             return db
  //             .into("tags")
  //             .insert(testTags)
  //             .then(() => {
  //               return db.into("prompt_tag").insert(testPromptTags)
  //               .then(() => {
  //                   return db.into("saved_prompts").insert(testSavedPrompts)
  //               })
  //             });
  //           });
  //       });
  //       it("GET /prompts responds with 200 and all of the saved prompts", () => {
  //         return supertest(app).get("/api/saved-prompts").expect(200);
  //       });
  //     });
  // });

  describe(`POST /api/saved-prompts`, () => {
    const testPrompts = makePromptsArray();
    const testTags = makeTagsArray();
    const testPromptTags = makePromptTagsArray();
    // const testSavedPrompts = makeSavedPromptsArray();

    beforeEach("insert prompts", () => {
      return db
        .into("prompts")
        .insert(testPrompts)
        .then(() => {
          return db
            .into("tags")
            .insert(testTags)
            .then(() => {
              return db.into("prompt_tag").insert(testPromptTags);
            });
        });
    });

    it("creates a saved prompt and responds with 201 and the new saved prompt", () => {
      const newSavedPrompt = {
        user: "r.weasley",
        prompt_id: 1,
      };
      return supertest(app)
        .post(`/api/saved-prompts`)
        .set("Authorization", "bearer " + authToken)
        .send(newSavedPrompt)
        .expect(201)
        .expect((res) => {
          expect(res.body.user).to.eql(newSavedPrompt.user);
          expect(res.body.prompt_id).to.eql(newSavedPrompt.prompt_id);
          expect(res.body).to.have.property("id");
        });
    });
  });

  describe(`DELETE /api/saved-prompts/:id`, () => {
    context(`Given saved prompt doesn't exist`, () => {
      it(`responds with 404`, () => {
        return supertest(app)
          .delete(`/api/saved-prompts/1235`)
          .expect(404, { error: { message: `Prompt does not exist` } });
      });
    });

    context("Given saved prompt exists", () => {
      const testPrompts = makePromptsArray();
      const testTags = makeTagsArray();
      const testPromptTags = makePromptTagsArray();
      const testSavedPrompts = makeSavedPromptsArray();

      beforeEach("insert prompts", () => {
        return db
          .into("prompts")
          .insert(testPrompts)
          .then(() => {
            return db
              .into("tags")
              .insert(testTags)
              .then(() => {
                return db
                  .into("prompt_tag")
                  .insert(testPromptTags)
                  .then(() => {
                    return db.into("saved_prompts").insert(testSavedPrompts);
                  });
              });
          });
      });

      it("responds with 204 and removes the saved prompt", () => {
        const idToRemove = 2;
        return supertest(app)
          .delete(`/api/saved-prompts/${idToRemove}`)
          .expect(204);
      });
    });
  });
});
