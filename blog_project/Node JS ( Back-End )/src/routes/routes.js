const express = require("express");
const { check, param } = require("express-validator");
const router = express.Router();

//--------- All routes configurations -------//

const getListService = require("../services/getBlogList.service");
const addBlogService = require("../services/addBlog.service");
const getBlogService = require("../services/getBlog.service");
const updateBlogService = require("../services/updateBlog.service");
const deleteBlogService = require("../services/deleteBlog.service");
const likeBlogService = require("../services/likeBlog.service");



//------------ GET Method for getting all blog posts ---------------//
router.get("/", getListService._getList);



//------------ POST Method for adding new blog post ---------------//
router.post(
  "/",
  [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .custom((value) => {
        if (value.length < 151) return true;
        return false;
      })
      .withMessage("Title should be less than 150 characters."),

    check("category")
      .not()
      .isEmpty()
      .withMessage("Category is required")
      .custom((value) => {
        if (value.length < 151) return true;
        return false;
      })
      .withMessage("Category should be less than 150 characters."),

    check("description", "Content is required").not().isEmpty(),
  ],
  addBlogService._addBlog
);



//------------ GET Method for getting blog post details by id ---------------//
router.get(
  "/:id",
  [param("id", "Invalid request").not().isEmpty()],
  getBlogService._getBlog
);



//------------ PUT Method for updating blog post details ---------------//
router.put(
  "/:id",
  [
    param("id", "Invalid request").not().isEmpty(),
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .custom((value) => {
        if (value.length < 151) return true;
        return false;
      })
      .withMessage("Title should be less than 150 characters."),

    check("category")
      .not()
      .isEmpty()
      .withMessage("Category is required")
      .custom((value) => {
        if (value.length < 151) return true;
        return false;
      })
      .withMessage("Category should be less than 150 characters."),
    check("description", "Content is required").not().isEmpty(),
  ],
  updateBlogService._updateBlog
);



//------------ Delete Method for deleting blog post by id ---------------//
router.delete(
  "/:id",
  [param("id", "Invalid request").not().isEmpty()],
  deleteBlogService._deleteBlog
);



//------------ PATCH Method for updating like value of blog post by id ---------------//
router.patch(
  "/:id",
  [param("id", "Invalid request").not().isEmpty()],
  likeBlogService._likeBlog
);



module.exports = router;
