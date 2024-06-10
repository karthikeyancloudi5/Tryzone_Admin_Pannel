const generalInfoSchema = require("../../model/settingsModel/general_InfoModel");

// Create data  ------------------------- http://localhost:3050/api/setting/generalInfo/create

exports.createGeneralInfo = async (req, res) => {
  const {
    websiteName,
    mobileNo,
    alternateMobileNo,
    supportCenterNo,
    whatsappNo,
    email,
    alternateEmail,
    address,
    city,
    state,
    pincode,
    facebook,
    instagram,
    linkedIn,
    twitter,
    youTube,
  } = req.body;

  try {
    const existingData = await generalInfoSchema.findOne({ websiteName });

    if (existingData) {
      return res.status(401).json({
        status: false,
        message: "Data already exist",
      });
    }

    const newData = await generalInfoSchema.create({
      websiteName,
      mobileNo,
      alternateMobileNo,
      supportCenterNo,
      whatsappNo,
      email,
      alternateEmail,
      address,
      city,
      state,
      pincode,
      facebook,
      instagram,
      linkedIn,
      twitter,
      youTube,
    });
    res.status(201).json({
      status: true,
      message: "Successfully Created",
      newData,
    });
  } catch (error) {
    console.log("createGeneralInfo :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// view data -------------------------- http://localhost:3050/api/setting/generalInfo/getitem

exports.listGeneralInfo = async (req, res) => {
  try {
    const data = await generalInfoSchema.find();

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    console.log("listGeneralInfo :", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// update data -------------------------- http://localhost:3050/api/setting/generalInfo/updateitem/665710d8770b33f76c8323ce

exports.updateGeneralInfo = async (req, res) => {
  const GeneralInfoItems = {
    websiteName: req.body.websiteName,
    mobileNo: req.body.mobileNo,
    alternateMobileNo: req.body.alternateMobileNo,
    supportCenterNo: req.body.supportCenterNo,
    whatsappNo: req.body.whatsappNo,
    email: req.body.email,
    alternateEmail: req.body.alternateEmail,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
    youTube: req.body.youTube,
  };
  try {
    const data = await generalInfoSchema.findByIdAndUpdate(
      req.params.id,
      GeneralInfoItems,
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        status: false,
        message: `No data found with the provided ${req.params.id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: "Sucessfully updated",
      data,
    });
  } catch (error) {
    console.log("updateGeneralInfo :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
