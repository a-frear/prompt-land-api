const followersService = {
  getAllFollowers(knex) {
    return knex.select("*").from("followers")
  },
  insertFollowing(knex, newFollowing) {
    return knex
      .insert(newFollowing)
      .into("followers")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deleteFollowing(knex, id) {
    return knex("followers").where("id", id).delete();
  },
  getByUsername(knex, id) {
    return knex.from("followers").select("*").where("id", id).first();
  },
  getByAllUsernames(knex, id) {
    return knex.from("followers").select("*").where("username", id)
  }
};

module.exports = followersService;
