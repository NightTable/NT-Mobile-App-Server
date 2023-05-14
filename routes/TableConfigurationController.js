const express = require("express");
// const { ObjectId } = require('mongodb');
const router = express.Router();
const TableConfiguration = require("../models/TableConfiguration");

router.get("/club/:clubId", async (req, res) => {
  try {
    let { clubId } = req.params;
    let clubs = await TableConfiguration.find({
      clubId: clubId,
      isDeleted: false,
    }).lean();
    if (!clubs.length)
      return res.status(404).send({ status: false, message: "no club found" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: clubs });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});



//make this work --- get table config on basis of eventID 
router.get("/event/:eventId", async (req, res) => {
  try {
    let { eventId } = req.params;
    let tables = await TableConfiguration.find({
      eventId: eventId,
      isDeleted: false,
    }).lean();
    if (!tables.length)
      return res.status(404).send({ status: false, message: "no club found" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: tables });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});



router.post("/club/:clubId", async (req, res) => {
  try {
    let { clubId } = req.params;
    let tableConfiguration = req.body;
    tableConfiguration.clubId = clubId;
    let table = await TableConfiguration.create(tableConfiguration);
    return res
      .status(201)
      .send({ status: true, message: "success", data: table });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.put("/:tableconfigId", async (req, res) => {
  try {
    let { tableConfigId } = req.params;
    let updatedTableConfigData = req.body;
    let updatedTableConfig = await TableConfiguration.findOneAndUpdate(
      { _id: tableConfigId, isDeleted: false },
      updatedTableConfigData,
      { new: true }
    );
    if (!updatedTableConfig)
      return res
        .status(404)
        .send({ status: false, message: "table not found" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: updatedTableConfig });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.delete("/:tableconfigId", async (req, res) => {
  try {
    let tableConfigId = req.params.tableconfigId;

    let deletedTable = await TableConfiguration.findOneAndUpdate(
      {
        _id: tableConfigId,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedTable)
      return res.status(404).send({ status: false, message: "not found" });
    return res
      .status(200)
      .send({ status: true, message: "successfully deleted" });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
