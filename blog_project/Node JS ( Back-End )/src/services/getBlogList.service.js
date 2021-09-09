const { getAllBlogPost } = require("../database/operations/getBlogPostList");

//service for getting all blog post from database
exports._getList = (req, res) => {
    getAllBlogPost().then((posts) => {
        res.status(200).send(posts);
     });
}