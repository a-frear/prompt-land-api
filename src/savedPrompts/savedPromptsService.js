const SavedPromptsService = {
    insertSavedPrompt(knex, newSaved) {
        return knex
            .insert(newSaved)
            .into('saved_prompts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByUsername(knex, username) {
        return knex('prompts')
        .innerJoin('prompt_tag', 'prompts.id', 'prompt_tag.prompt_id')
        .innerJoin('tags', 'tags.id', 'prompt_tag.tag_id')
        .innerJoin('saved_prompts', 'prompts.id', 'saved_prompts.prompt_id')
        .select(['prompts.id', 'prompts.username', 'prompts.modified', 'prompts.prompt', knex.raw('ARRAY_AGG(tags.tag_title) as tags')])
        .groupBy('prompts.id')
        .where('saved_prompts.username', username)
    },
    getById(knex, username) {
        return knex.from("saved_prompts")
        .select("*")
        .where("username", username).first();
    },
    deleteSavedPrompt(knex, id) {
        return knex('saved_prompts')
          .where({ id })
          .delete()
    }
}

module.exports = SavedPromptsService