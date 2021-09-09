const { validationResult } = require("express-validator");
const { addBlogPost } = require("../database/operations/addBlogPost");



// Service for adding blog post to database.
exports._addBlog = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const { title, category, description } = req.body;

  addBlogPost(title, category, description)
    .then(() => {
      res.status(200).json({ message: "Blog post added successfully." });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error in performing operation." });
    });
};
