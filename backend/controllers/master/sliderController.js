const sliderSchema = require("../../model/masterModel/slider");
const path = require("path");

exports.createSlider = async (req, res) => {
  try {
    const { title, content, imageAltTag, status } = req.body;

    const slider = await sliderSchema.findOne({ title });

    if (slider) {
      return res.status(409).json({
        status: false,
        message: `${title} is already exist`,
      });
    }

    if (!title || !status) {
      return res.status(400).json({
        status: false,
        message: "please fill required details",
      });
    }

    if (!req.files) {
      return res.status(400).json({
        status: false,
        message: "image is not selected",
      });
    }

    const uploadFile = req.files.image;

    let uploadDir = path.join(__dirname, "../../uploads/master/sliderImg");
    let filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

    uploadFile.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: `image upload error ${error.message}`,
        });
      }
    });

    if (!slider) {
      const newSlider = await sliderSchema.create({
        title,
        content,
        imageAltTag,
        image: filePath,
        status,
      });
      res.status(201).json({
        status: true,
        message: "Slider created successfully",
        newSlider,
      });
    }
  } catch (error) {
    console.log("createSlider :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.listAllSlider = async (req, res) => {
  try {
    const sliderList = await sliderSchema.find();
    if (!sliderList) {
      return res.status(404).json({
        status: false,
        message: "Slider is empty",
      });
    }
    res.status(200).json({
      status: true,
      sliderList,
    });
  } catch (error) {
    console.log("listSlider :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateSlider = async (req, res) => {
  const { title, content, imageAltTag, status } = req.body;

  try {
    const existSlider = await sliderSchema.findById(req.params.id);

    if (!existSlider) {
      return res.status(404).json({
        status: false,
        message: "Slider not found with this ID",
      });
    }

    if (!title || !status) {
      return res.status(400).json({
        status: false,
        message: "please fill required details",
      });
    }

    if (title) existSlider.title = title;
    if (content) existSlider.content = content;
    if (imageAltTag) existSlider.imageAltTag = imageAltTag;
    if (status) existSlider.status = status;

    if (!req.files) {
      return res.status(400).json({
        status: false,
        message: "image is not selected",
      });
    }

    if (req.files && req.files.image) {
      const uploadFile = req.files.image;
      let uploadDir = path.join(__dirname, "../../uploads/master/sliderImg");
      let filePath = path.join(uploadDir, `${Date.now()}-${uploadFile.name}`);

      uploadFile.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: `image upload error ${err.message}`,
          });
        }
      });

      existSlider.image = filePath;

      await existSlider.save();

      res.status(200).json({
        status: true,
        message: "Successfully updated",
        existSlider,
      });
    }
  } catch (error) {
    console.log("updateSlider:", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const slider = await sliderSchema.findByIdAndDelete(req.params.id);
    if (slider) {
      return res.status(200).json({
        status: true,
        message: "Slider deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Slider is not found with this id",
      });
    }
  } catch (error) {
    console.log("deleteSlider :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
