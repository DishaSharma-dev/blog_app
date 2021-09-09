const { validationResult } = require("express-validator");
const { editBlogPost } = require("../database/operations/editBlogPost");


// service for updating blog post details
exports._updateBlog = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const { title, category, description } = req.body;
  const id = req.params.id;

  editBlogPost(id, title, category, description)
    .then(() => {
      res.status(200).json([{ message: "Blog post updated successfully." }]);
    })
    .catch(() => {
      res.status(500).json([{ error: "Error in performing operation." }]);
    });
};
