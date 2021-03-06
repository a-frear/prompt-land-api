const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeFollowersArray, authToken } = require("./followers.fixtures");
const { makeUsersArray } = require("./users.fixtures");

describe("users Endpoints", function () {
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
    db.raw("TRUNCATE users, followers RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE users, followers RESTART IDENTITY CASCADE")
  );

  describe(`GET /users`, () => {
    context("Given there are no users in the database", () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/users").expect(200, []);
      });
    });
    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();
      const testFollowers = makeFollowersArray();

      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db.into("followers").insert(testFollowers);
          });
      });
      it("GET /users responds with 200 and all of the users", () => {
        return supertest(app).get("/api/users").expect(200);
      });
    });
  });

  describe(`POST /api/users`, () => {
    it(`creates a new user`, () => {
      this.retries(3);
      const newUser = {
        username: "test_user_123",
      };
      return supertest(app)
        .post(`/api/users`)
        .set("Authorization", "bearer " + authToken)
        .send(newUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.username).to.eql(newUser.username);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
        });
    });
  });
});
