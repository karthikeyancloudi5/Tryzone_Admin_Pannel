const emailConfigSchema = require("../../model/settingsModel/mailConfigModel");

// create data --------------------- http://localhost:3050/api/setting/mailconfig/create
exports.createMailConfig = async (req, res) => {
  const {
    SMPT_Mailer,
    mailHost,
    mailPort,
    mailUsername,
    mailPassword,
    mailEncryption,
    mailFromAddress,
    mailFromName,
  } = req.body;

  try {
    const existingData = await emailConfigSchema.findOne({ mailHost });

    if (existingData) {
      return res.status(400).json({
        status: false,
        message: "Data already exist",
      });
    }

    const newData = await emailConfigSchema.create({
      SMPT_Mailer,
      mailHost,
      mailPort,
      mailUsername,
      mailPassword,
      mailEncryption,
      mailFromAddress,
      mailFromName,
    });

    res.status(201).json({
      status: true,
      message: "Successfully created",
      newData,
    });
  } catch (error) {
    console.log("createMailConfig", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// view data  --------------------------  http://localhost:3050/api/setting/mailconfig/getitem
exports.listMailConfig = async (req, res) => {
  try {
    const data = await emailConfigSchema.findOne();
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "data not found",
      });
    }
    res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    console.log("listMailConfig :", listMailConfig);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//  update data ---------------------------  http://localhost:3050/api/setting/mailconfig/updateitem/:id
exports.updateMailConfig = async (req, res) => {
  const mailConfigItems = {
    SMPT_Mailer: req.body.SMPT_Mailer,
    mailHost: req.body.mailHost,
    mailPort: req.body.mailPort,
    mailUsername: req.body.mailUsername,
    mailPassword: req.body.mailPassword,
    mailEncryption: req.body.mailEncryption,
    mailFromAddress: req.body.mailFromAddress,
    mailFromName: req.body.mailFromName,
  };

  try {
    const data = await emailConfigSchema.findByIdAndUpdate(
      req.params.id,
      mailConfigItems,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(404).json({
        status: false,
        message: `data not found with this${req.params.id} `,
      });
    }
    res.status(200).json({
      status: true,
      message: "successfully updated",
      data,
    });
  } catch (error) {
    console.log("updateMailConfig :", error.message);
    res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
};
