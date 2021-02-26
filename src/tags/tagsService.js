const TagsService = {
    getAllTags(knex){
        return knex.select('*').from('tags')
    },
    getById(knex, id) {
        return knex.from('tags').select('*').where('id', id).first()
    },
}

module.exports = TagsService