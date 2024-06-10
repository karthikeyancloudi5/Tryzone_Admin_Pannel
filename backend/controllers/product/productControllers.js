const path = require("path");
const productSchema = require("../../model/productModel/product");
const categorieSchema = require("../../model/productModel/categories");

exports.createProductsByCategory = async (req, res) => {
  const {
    particulars,
    composition,
    packing,
    type,
    therapeuticRole,
    categories,
    status,
  } = req.body;

  try {
    const category = await categorieSchema.findById(categories);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    const existProduct = await productSchema.findOne({ particulars });

    if (existProduct) {
      return res.status(400).json({
        status: false,
        message: `${particulars} is already exist`,
      });
    }

    if (!req.files) {
      return res.status(400).json({
        status: false,
        message: "Image is not selected",
      });
    }

    const uploadFile = req.files.image;
    const uploadDir = path.join(__dirname, "../../uploads/productImg");
    const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

    uploadFile.mv(filePath, async (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: `Image upload error: ${err.message}`,
        });
      }
    });

    const newProduct = await productSchema.create({
      particulars,
      composition,
      packing,
      type,
      therapeuticRole,
      categories,
      image: filePath,
      status,
    });

    res.status(201).json({
      status: true,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    console.log("createProduct:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.listProductsByCategory = async (req, res) => {
  const { categories } = req.params;

  try {
    const category = await categorieSchema.findById(categories);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    const products = await productSchema
      .find({ categories })
      .populate("categories", "categoryName");

    res.status(200).json({
      status: true,
      products,
    });
  } catch (error) {
    console.log("listProductsByCategory error:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateProductByCategory = async (req, res) => {
  const { id } = req.params;
  const {
    particulars,
    composition,
    packing,
    type,
    therapeuticRole,
    categories,
    status,
  } = req.body;

  try {
    const category = await categorieSchema.findById(categories);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: `Category not found`,
      });
    }

    const product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    if (particulars && particulars !== product.particulars) {
      const existProduct = await productSchema.findOne({ particulars });
      if (existProduct) {
        return res.status(400).json({
          status: false,
          message: `${particulars} is already exist`,
        });
      }
      product.particulars = particulars;
    }

    product.composition = composition || product.composition;
    product.packing = packing || product.packing;
    product.type = type || product.type;
    product.therapeuticRole = therapeuticRole || product.therapeuticRole;
    product.categories = categories || product.categories;
    product.status = status || product.status;

    if (req.files && req.files.image) {
      const uploadFile = req.files.image;
      const uploadDir = path.join(__dirname, "../../uploads/productImg");
      const filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

      uploadFile.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: `Image upload error: ${err.message}`,
          });
        }
      });

      product.image = filePath;
    }

    await product.save();

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("updateProduct:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteProductByCategory = async (req, res) => {
  try {
    const deleteData = await productSchema.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({
        status: false,
        message: "product not found",
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
