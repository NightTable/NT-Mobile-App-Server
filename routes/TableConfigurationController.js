const express = require("express");
// const { ObjectId } = require('mongodb');
const router = express.Router();
const TableConfiguration = require("../models/TableConfiguration");
const Event = require("../models/Event");
const TableRequestCollection = require("../models/TableRequest");

router.get("/club/:clubId", async (req, res) => {
  try {
    let { clubId } = req.params;
    let clubs = await TableConfiguration.find({
      clubId: clubId,
      isDeleted: false,
    }).lean();
    if (!clubs.length)
      return res
        .status(200)
        .send({ status: false, message: "no table config found" });
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
      return res.status(200).send({ status: false, message: "no club found" });
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
    let EventUpdate = await Event.findOneAndUpdate(
      { _id: tableConfiguration.eventId, isDeleted: false },
      { isTableConfigAdded: true },
      { new: true }
    );
    if (!EventUpdate)
      return res
        .status(200)
        .send({ status: false, message: "event not found" });
    let table = await TableConfiguration.create(tableConfiguration);
    return res
      .status(201)
      .send({ status: true, message: "success", data: table });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.put("/:tableConfigId", async (req, res) => {
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
        .status(200)
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
      return res.status(200).send({ status: false, message: "not found" });
    let tableForEventCheck = await TableConfiguration.find({
      eventId: deletedTable.eventId,
      isDeleted: false,
    }).lean();
    if (!tableForEventCheck.length) {
      let patchEvent = await Event.findOneAndUpdate(
        { _id: deletedTable.eventId, isDeleted: false },
        { isTableConfigAdded: false },
        { new: true }
      );
      if (!patchEvent)
        return res
          .status(200)
          .send({ status: false, message: "event not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "successfully deleted" });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//get table configurations with no active table requests
router.get("/tableConfigurations/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let boughtOutTableConfigs = await TableRequestCollection
      .find({ eventId: eventId, isActive: true, isDeleted: false })
      .select({ _id: 0, tableConfigId: 1 })
      .lean();

    let tablesStillNotBoughtOut =
      await TableConfiguration
        .find({
          _id: { $nin: boughtOutTableConfigs },
          eventId:eventId,
          isDeleted: false,
        })
        .lean();
    if (!tablesStillNotBoughtOut.length)
      return res
        .status(200)
        .send({ status: false, message: "table config not found" });
    return res.status(200).send({
      status: true,
      message: "table configs found",
      data: tablesStillNotBoughtOut,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
