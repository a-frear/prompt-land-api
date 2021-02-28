const UsersService = {
    insertFollowing(knex, newFollowing) {
        return knex
            .insert(newFollowing)
            .into('followers')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFollowing(knex, user) {
        return knex('followers')
          .where({ following_user })
          .delete()
    },
    getByUsername(knex, id) {
        return knex.from("followers")
        .select("following_user")
        .where("following_user", id).first();
    }
    
}

module.exports = UsersService