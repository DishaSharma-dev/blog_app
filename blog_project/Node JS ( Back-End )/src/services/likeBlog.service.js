const { validationResult } = require("express-validator");
const { likeBlogPost } = require("../database/operations/likeBlogPost");


//service for liking blog post
exports._likeBlog = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  likeBlogPost(req.params.id, req.body.likes)
    .then(() => {
      return res.status(200).json({ message: "You liked the blog post." });
    })
    .catch(() => {
      return res.status(500).json({ msg: "Error in performing operation." });
    });
};
