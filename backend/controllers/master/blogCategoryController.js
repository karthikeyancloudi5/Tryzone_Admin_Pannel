const blogCategorySchema = require("../../model/masterModel/blogCategory");

exports.createBlogCategory = async (req, res) => {
  const { name, status, metaTitle, metaKeywords, metaDescription } = req.body;

  try {
    const blogCategory = await blogCategorySchema.findOne({ name });
    // i did validation for unique
    if (blogCategory) {
      return res.status(409).json({
        status: false,
        message: `${name} is already exist`,
      });
    }

    if (!name || !status) {
      return res.status(400).json({
        status: false,
        message: "please fill required details",
      });
    }

    if (!blogCategory) {
      const newBlogCategory = await blogCategorySchema.create({
        name,
        metaTitle,
        metaKeywords,
        metaDescription,
        status,
      });
      res.status(201).json({
        status: true,
        message: "Blogcategory successfully created",
        newBlogCategory,
      });
    }
  } catch (error) {
    console.log("createBlogCategory :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateBlogCategory = async (req, res) => {
  const updateCategory = {
    name: req.body.name,
    status: req.body.status,
    metaTitle: req.body.metaTitle,
    metaKeywords: req.body.metaKeywords,
    metaDescription: req.body.metaDescription,
  };

  try {
    const blogCategory = await blogCategorySchema.findByIdAndUpdate(
      req.params.id,
      updateCategory
    );

    if (!blogCategory) {
      return res.status(404).json({
        status: false,
        message: "Category is not found with this ID",
      });
    }

    if (!req.body.name || !req.body.status) {
      return res.status(400).json({
        status: false,
        message: "please fill required details",
      });
    }
    res.status(200).json({
      status: true,
      message: "Successfully updated",
    });
  } catch (error) {
    console.log("updateBlogCategory :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteBlogCategory = async (req, res) => {
  try {
    const blogCategory = await blogCategorySchema.findByIdAndDelete(
      req.params.id
    );
    if (!blogCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found with this ID",
      });
    }
    res.status(200).json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log("deleteBlogCategory:", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.listBlogCategory = async (req, res) => {
  try {
    const blogCategory = await blogCategorySchema.find();

    if (blogCategory.length == 0) {
      return res.status(404).json({
        status: false,
        message: "blogCategory is empty",
      });
    }

    res.status(200).json({
      status: true,
      blogCategory,
    });
  } catch (error) {
    console.log("listBlogCategory :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
