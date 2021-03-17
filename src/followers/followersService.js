const followersService = {
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
};

module.exports = followersService;
