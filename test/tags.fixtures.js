function makeTagsArray() {
  return [
    {
      id: 1,
      tag_title: "whatever",
    },
    {
      id: 2,
      tag_title: "fiction",
    },
    {
      id: 3,
      tag_title: "poetry",
    },
  ];
}

function makePromptTagsArray() {
  return [
    {
      id: 1,
      prompt_id: 1,
      tag_id: 1,
    },
    {
      id: 2,
      prompt_id: 2,
      tag_id: 2,
    },
    {
      id: 3,
      prompt_id: 3,
      tag_id: 3,
    },
    {
      id: 4,
      prompt_id: 4,
      tag_id: 1,
    },
    {
      id: 5,
      prompt_id: 5,
      tag_id: 2,
    },
  ];
}

function maliciousPromptTagsArray() {
  [
    {
      id: 6,
      prompt_id: 911,
      tag_id: 3,
    },
  ];
}

module.exports = {
  makeTagsArray,
  makePromptTagsArray,
  maliciousPromptTagsArray,
};
