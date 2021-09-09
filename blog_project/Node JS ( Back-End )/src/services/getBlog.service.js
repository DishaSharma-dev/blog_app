const { validationResult } = require("express-validator");
const { getBlogPostDetails } = require("../database/operations/getBlogPostDetails");


//service for getting blog post details from database
exports._getBlog = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const id = req.params.id;

    getBlogPostDetails(id).then(function(details) {
          res.status(200).send(details);
    })
    .catch(() => {
      res.status(500).json({ error: "Error in fetching data." });
    });
};
