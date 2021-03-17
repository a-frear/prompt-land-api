const UsersService = {
  getAllUsers(knex) {
    return knex("users")
      .innerJoin("followers", "users.username", "followers.username")
      .select([
        "users.username",
        knex.raw("ARRAY_AGG(followers.following_user) as following"),
      ])
      .groupBy("users.username");
  },
  insertUsers(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("users").select("*").where("id", id).first();
  },
};

module.exports = UsersService;
