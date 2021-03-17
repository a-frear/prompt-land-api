const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeFollowersArray, authToken } = require("./followers.fixtures");

describe("Followers Endpoints", function () {
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
    db.raw("TRUNCATE followers RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE followers RESTART IDENTITY CASCADE")
  );

  describe(`POST /api/followers`, () => {
    it(`creates a new follower row`, () => {
      this.retries(3);
      const newFollower = {
        user: "test_user_123",
        following_user: "new_friend_321",
      };
      return supertest(app)
        .post(`/api/followers`)
        .set("Authorization", "bearer " + authToken)
        .send(newFollower)
        .expect(201)
        .expect((res) => {
          expect(res.body.following_user).to.eql(newFollower.following_user);
          expect(res.body.user).to.eql(newFollower.user);
          expect(res.body).to.have.property("id");
        });
    });
  });

  describe(`DELETE /api/followers/:id`, () => {
    context(`Given no followers`, () => {
      it(`responds with 404`, () => {
        return supertest(app)
          .delete(`/api/followers/1235`)
          .expect(404, { error: { message: `user does not exist` } });
      });
    });

    context("Given there are followers in the database", () => {
      const testFollowers = makeFollowersArray();

      beforeEach("insert follower", () => {
        return db.into("followers").insert(testFollowers);
      });

      it("responds with 204 and removes the follower", () => {
        const idToRemove = 1;
        return supertest(app)
          .delete(`/api/followers/${idToRemove}`)
          .expect(204);
      });
    });
  });
});
