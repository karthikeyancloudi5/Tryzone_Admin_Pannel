const blogCommentSchema = require("../../model/blogModel/blogCommentModel");

exports.postBlogComments = async (req, res) => {
  const { name, email, comments, blogsId } = req.body;
  try {
    const newBlogComments = await blogCommentSchema.create({
      name,
      email,
      comments,
      blogsId,
    });

    res.status(201).json({
      status: true,
      message: "comments sucessfully created",
      newBlogComments,
    });
  } catch (error) {
    console.log("postBlogComments :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.viewBlogComments = async (req, res) => {
  try {
    const blogComment = await blogCommentSchema
      .find()
      .populate("blogName", "name");

    if (blogComment.length == 0) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }
    res.status(200).json({
      status: true,
      blogComment,
    });
  } catch (error) {
    console.log("viewBlogComments :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
