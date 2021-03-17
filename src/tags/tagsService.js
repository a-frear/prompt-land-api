const TagsService = {
  insertTags(knex, newPromptTag) {
    return knex
      .insert(newPromptTag)
      .into("prompt_tag")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getTagById(knex, tag) {
    return knex("prompts")
      .innerJoin("prompt_tag", "prompts.id", "prompt_tag.prompt_id")
      .innerJoin("tags", "tags.id", "prompt_tag.tag_id")
      .select([
        "prompts.id",
        "prompts.user",
        "prompts.modified",
        "prompts.prompt",
        knex.raw("ARRAY_AGG(tags.tag_title) as tags"),
      ])
      .where("tags.id", tag)
      .groupBy("prompts.id");
  },
};

module.exports = TagsService;
