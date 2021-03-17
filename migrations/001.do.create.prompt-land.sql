CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user TEXT NOT NULL
);

CREATE TABLE prompts (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user TEXT NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    prompt TEXT NOT NULL
);

CREATE TABLE followers (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user TEXT NOT NULL,
    following_user TEXT NOT NULL
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    tag_title TEXT NOT NULL
);

CREATE TABLE prompt_tag (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    prompt_id INTEGER REFERENCES prompts(id) ON DELETE SET NULL,
    tag_id INTEGER REFERENCES tags(id) ON DELETE SET NULL
);

CREATE TABLE saved_prompts (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user TEXT NOT NULL,
    prompt_id INTEGER REFERENCES prompts(id)
    ON DELETE SET NULL
);
