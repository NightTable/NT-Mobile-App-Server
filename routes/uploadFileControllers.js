const express = require("express");
const router = express.Router();
const aws = require("../controllers/awsS3Upload");

router.post("/file", async (req, res) => {
  try {
    //uploading files
    let files = req.files;
    let id = req.body._id;
    if (!id)
      return res
        .status(400)
        .send({ status: false, message: "_id is required to add photos" });
    let locations = [];
    if (files && files.length > 0) {
      let i = 0;
      while (i < files.length) {
        let uploadedFileURL = await aws.uploadFile(files[i], id);
        locations.push(uploadedFileURL);
        i++;
      }
      return res
        .status(201)
        .send({ status: true, message: "files uploaded", data: locations });
    } else {
      return res.status(400).send({
        status: false,
        message: "Please provide a image to upload against a key 'files'.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err,
    });
  }
});

module.exports = router;
