INSERT INTO users (username) 
VALUES 
    ('amy.frear'),
    ('h.filbourn'),
    ('eyesiteclub'),
    ('tua05859');

INSERT INTO prompts (username, prompt) 
VALUES 
 ('amy.frear',
    'someone is eating a tangerine'),
  ('h.filbourn', 
    'a camel wants to get a hump removed. why?'),
  ('eyesiteclub', 
    'a scene where everyone must whisper'),
  ('eyesiteclub', 
    'your kitchen sink throughout various points of the day'),
  ('tua05859', 
    'Lorem ipsum dolor sit amet.');

INSERT INTO followers (username, following_user)
VALUES 
    ('amy.frear', 'h.filbourn'),
    ('amy.frear', 'eyesiteclub'),
    ('h.filbourn', 'eyesiteclub'),
    ('h.filbourn', 'tua05859'),
    ('tua05859', 'amy.frear'),
    ('tua05859', 'eyesiteclub');

INSERT INTO tags (tag_title) 
VALUES
    ('whatever'),
    ('free_writing'),
    ('fiction'),
    ('photography'),
    ('comedy_writing'),
    ('screenwriting'),
    ('poetry'),
    ('playwrighting'),
    ('performance'),
    ('painting'),
    ('sculpture'),
    ('collage'),
    ('fabric_arts'),
    ('video'),
    ('songwriting'),
    ('music');

INSERT INTO prompt_tag (prompt_id, tag_id)
VALUES
    (1, 1),
    (1, 4),
    (1, 13),
    (2, 3),
    (3, 4),
    (3, 6),
    (4, 2),
    (4, 7),
    (4, 8),
    (4, 10),
    (5, 5),
    (5, 9),
    (5, 3),
    (5, 1);

INSERT INTO saved_prompts (username, prompt_id)
VALUES
  ('amy.frear', 1),
  ('amy.frear', 4),
  ('h.filbourn', 1),
  ('eyesiteclub', 5);
