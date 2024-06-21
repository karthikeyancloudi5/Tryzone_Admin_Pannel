const blogSchema = require("../../model/blogModel/blogModel");
const blogCategorySchema = require("../../model/masterModel/blogCategory");
const path = require("path");

exports.createBlog = async (req, res) => {
  const {
    blogDate,
    category,
    name,
    imageAltTag,
    authorName,
    authorImageAlt,
    metaTitle,
    metaKeywords,
    metaDescription,
    others,
    status,
    blogDescription,
  } = req.body;

  try {
    const blogCategory = await blogCategorySchema.findById(category);
    if (!blogCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    const isExitBlog = await blogSchema.findOne({ name });

    if (isExitBlog) {
      return res.status(409).json({
        status: true,
        message: `${name} blog is already exist`,
      });
    }

    if (!req.files.image) {
      return res.status(400).json({
        status: false,
        message: "Required images are not selected",
      });
    }

    const uploadDir = path.join(__dirname, "../uploads/blog");
    const uploadDirAuthorImg = path.join(uploadDir, "blogAuthorImg");

    const uploadFile = req.files.image;
    const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);
    await uploadFile.mv(filePath);

    let authorImgFilepath = null;
    if (req.files.authorImage) {
      const uploadblogAuthorImg = req.files.authorImage;
      authorImgFilepath = path.join(
        uploadDirAuthorImg,
        `${Date.now()}-${uploadblogAuthorImg.name}`
      );
      await uploadblogAuthorImg.mv(authorImgFilepath);
    }

    const blogData = await blogSchema.create({
      blogDate,
      category,
      name,
      image: filePath,
      imageAltTag,
      authorName,
      authorImage: authorImgFilepath,
      authorImageAlt,
      metaTitle,
      metaKeywords,
      metaDescription,
      others,
      status,
      blogDescription,
    });

    res.status(201).json({
      status: true,
      message: "Successfully created",
      blogData,
    });
  } catch (error) {
    console.error("createBlog:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const {
      blogDate,
      category,
      name,
      imageAltTag,
      authorName,
      authorImageAlt,
      metaTitle,
      metaKeywords,
      metaDescription,
      others,
      status,
      blogDescription,
    } = req.body;

    const blogCategory = await blogCategorySchema.findById(category);

    if (!blogCategory) {
      return res.status(404).json({
        status: false,
        message: `Category not found`,
      });
    }

    const blog = await blogSchema.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: false,
        message: `blog not found`,
      });
    }

    if (name && name !== blog.name) {
      const isExitBlog = await blogSchema.findOne({ name });
      if (isExitBlog) {
        return res.status(400).json({
          status: false,
          message: `${name} is already exist`,
        });
      }

      blog.name = name;
    }

    blog.blogDate = blogDate || blog.blogDate;
    blog.imageAltTag = imageAltTag || blog.imageAltTag;
    blog.authorName = authorName || blog.authorName;
    blog.authorImageAlt = authorImageAlt || blog.authorImageAlt;
    blog.metaTitle = metaTitle || blog.metaTitle;
    blog.metaKeywords = metaKeywords || blog.metaKeywords;
    blog.metaDescription = metaDescription || blog.metaDescription;
    blog.others = others || blog.others;
    blog.status = status || blog.status;
    blog.blogDescription = blogDescription || blog.blogDescription;

    if (!req.files.image) {
      return res.status(400).json({
        status: false,
        message: "Required images are not selected",
      });
    }

    const uploadDir = path.join(__dirname, "../uploads/blog");
    const uploadDirAuthorImg = path.join(uploadDir, "blogAuthorImg");

    const uploadFile = req.files.image;
    const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);
    await uploadFile.mv(filePath);

    if (req.files.authorImage) {
      const uploadblogAuthorImg = req.files.authorImage;
      const authorImgFilepath = path.join(
        uploadDirAuthorImg,
        `${Date.now()}-${uploadblogAuthorImg.name}`
      );
      await uploadblogAuthorImg.mv(authorImgFilepath);
      blog.authorImage = authorImgFilepath;
    } else {
      blog.authorImage = null;
    }

    await blog.save();
    res.status(200).json({
      status: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log("Updateblog :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "blog not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Sucessfuly deleted",
    });
  } catch (error) {
    console.log("deleteBlog :", error.message);
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.listBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogcategories = await blogCategorySchema.findById(category);

    if (!blogcategories) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    const blogs = await blogSchema
      .find({ category })
      .populate("category", "name");

    res.status(200).json({
      status: true,
      blogs,
    });
  } catch (error) {
    console.log("listBlogsByCategory:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
