const PromptsService = {
    getAllPrompts(knex){
        return knex
        .select('*')
        .from('prompts')
        .join('prompt_tag', 'prompts.id', 'prompt_tag.prompt_id')
        .join('tags', 'tags.id', 'prompt_tag.tag_id')
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
        return knex
        .from('prompt_tag')
        .select('tag_title')
        .join('prompt_tag', 'tags.id', 'prompt_tag.tag_id')
        .where('tags.id', id)
    }
}

module.exports = PromptsService