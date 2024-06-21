const path = require("path");
const categorieSchema = require("../../model/productModel/categories");

exports.createCategories = async (req, res) => {
  const { categoryName, priority, status } = req.body;

  try {
    const data = await categorieSchema.findOne({
      categoryName,
    });

    if (data) {
      return res.status(409).json({
        status: false,
        message: "Category is already exist",
      });
    }

    if (!req.files) {
      return res.status(400).json({
        status: false,
        message: "image is not selected",
      });
    }

    const uploadFile = req.files.image;

    const uploadDir = path.join(__dirname, "../../uploads/categoryImg");
    const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

    uploadFile.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `image upload error ${err.message}`,
        });
      }
    });

    if (!data) {
      const newCategory = await categorieSchema.create({
        categoryName,
        priority,
        image: filePath,
        status,
      });

      res.status(201).json({
        status: true,
        message: "category created successfully",
        newCategory,
      });
    }
  } catch (error) {
    console.log("createCategories :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const data = await categorieSchema.find();

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "category is not found",
      });
    }

    res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    console.log("listCategories :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, priority, status } = req.body;

  try {
    const category = await categorieSchema.findById(id);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: `Category not found`,
      });
    }

    if (categoryName) category.categoryName = categoryName;
    if (priority) category.priority = priority;
    if (status) category.status = status;

    if (req.files && req.files.image) {
      const uploadFile = req.files.image;
      const uploadDir = path.join(__dirname, "../../uploads/categoryImg");
      const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

      uploadFile.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `Image upload error: ${err.message}`,
          });
        }
      });

      category.image = filePath;
    }

    await category.save();

    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("updateCategory:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleteData = await categorieSchema.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Sucessfuly deleted",
    });
  } catch (error) {
    console.log("deleteCategory :", error.message);
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
