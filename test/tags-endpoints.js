const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makePromptsArray } = require("./prompts.fixtures");
const { makeTagsArray, authToken } = require("./tags.fixtures");

describe("tags Endpoints", function () {
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
    db.raw("TRUNCATE prompts, tags, prompt_tag RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE prompts, tags, prompt_tag RESTART IDENTITY CASCADE")
  );

  describe(`POST /api/tags`, () => {
    const testTags = makeTagsArray();
    const testPrompts = makePromptsArray();

    beforeEach("insert prompts", () => {
      return db
        .into("prompts")
        .insert(testPrompts)
        .then(() => {
          return db.into("tags").insert(testTags);
        });
    });

    it(`creates a new prompt tag`, () => {
      const newPromptTag = {
        prompt_id: 2,
        tag_id: 3,
      };
      return supertest(app)
        .post(`/api/tags`)
        .set("Authorization", "bearer " + authToken)
        .send(newPromptTag)
        .expect(201);
    });
  });
});
