const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const {
  makePromptsArray,
  makeMaliciousPrompt,
  authToken,
} = require("./prompts.fixtures");

describe("Prompts Endpoints", function () {
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
    db.raw("TRUNCATE prompts RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE prompts RESTART IDENTITY CASCADE")
  );

  describe(`GET /prompts`, () => {
    context("Given there are no prompts in the database", () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/prompts").expect(200, []);
      });
    });
    context("Given there are prompts in the database", () => {
      const testPrompts = makePromptsArray();

      beforeEach("insert prompts", () => {
        return db
          .into("prompts")
          .insert(testPrompts)
      });
      it("GET /prompts responds with 200 and all of the prompts", () => {
        return supertest(app).get("/api/prompts").expect(200, testPrompts);
      });
    });
    context(`Given an XSS attack prompt`, () => {
      const { maliciousPrompt, expectedPrompt } = makeMaliciousPrompt();

      beforeEach("insert malicious prompt", () => {
            return db.into("prompts").insert([maliciousPrompt]);
          });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/prompts/${maliciousPrompt.id}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.prompt).to.eql(expectedPrompt.prompt);
          });
      });
    });
});

  describe(`POST /api/prompts`, () => {

    it(`creates a comment and responds with 201 and the new comment`, () => {
      this.retries(3);
      const newPrompt = {
        prompt: "Test new prompt",
        username: "test_user_123"
      };
      return supertest(app)
        .post(`/api/prompts`)
        .set("Authorization", "bearer " + authToken)
        .send(newPrompt)
        .expect(201)
        .expect((res) => {
          expect(res.body.prompt).to.eql(newPrompt.prompt);
          expect(res.body.username).to.eql(newPrompt.username);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/api/prompts/${res.body.id}`);
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body.modified).toLocaleString();
          expect(actual).to.eql(expected);
        })
        .then((postRes) =>
          supertest(app)
            .get(`/api/prompts/${postRes.body.id}`)
            .expect(postRes.body)
        );
    });

    it("removes XSS attack content from response", () => {
      const { maliciousPrompt, expectedPrompt } = makeMaliciousPrompt();
      return supertest(app)
        .post(`/api/prompts`)
        .set("Authorization", "bearer " + authToken)
        .send(maliciousPrompt)
        .expect(201)
        .expect((res) => {
          expect(res.body.prompt).to.eql(expectedPrompt.prompt);
        });
    });
});
});
