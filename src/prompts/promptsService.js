const PromptsService = {
    getAllPrompts(knex){
        return knex.select('*').from('prompts')
    },
    insertPrompts(knex, newPrompt) {
        return knex
            .insert(newPrompt)
            .into('prompts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('prompts').select('*').where('id', id).first()
    },
    deletePrompt(knex, id) {
        return knex('prompts')
          .where({ id })
          .delete()
    },
    addTags(knex, id) {
        return knex.from('prompt_tag').select('tag_id').where('prompt_id', id)
    }
}

module.exports = PromptsService