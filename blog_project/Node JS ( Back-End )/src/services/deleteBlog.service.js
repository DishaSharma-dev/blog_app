const { validationResult } = require("express-validator");
const { deleteBlogPost } = require("../database/operations/deleteBlogPost");


//service for delete blog post.
exports._deleteBlog = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  deleteBlogPost(req.params.id)
    .then(() => {
      return res
        .status(200)
        .json({ message: "Blog post deleted successfully." });
    })
    .catch(() => {
      return res.status(500).json({ msg: "Error in performing operation." });
    });
};
