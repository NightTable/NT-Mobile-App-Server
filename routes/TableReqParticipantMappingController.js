const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const tableReqParticipantMapping = require("../models/TableRequestParticipantMapping");

router.post("/tableReqParticipantMapping", async (req, res) => {
    try {
      let tableReqParticipantMappingBody = req.body;
      let tableReqParticipantMapping = await tableReqParticipantMapping.create(tableReqParticipantMappingBody);
      return res.status(201).send({
        status: true,
        message: "tableReqParticipantMapping created successfully",
        data: tableReqParticipantMapping,
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  });


  router.put("/:tableReqParticipantMapping", async (req, res) => {
    try {
      let tableReqParticipantMappingUpdateBody = req.body;
      let { tableReqParticipantMappingId } = req.params;
      let tableReqParticipantMappingUpdated = await tableReqParticipantMapping.findOneAndUpdate(
        { _id: tableReqParticipantMappingId, isDeleted: false },
        tableReqParticipantMappingUpdateBody,
        { new: true }
      );
      if (!tableReqParticipantMappingUpdated)
        return res
          .status(404)
          .send({ status: false, message: "tableReqParticipantMappingUpdated not found" });
      return res.status(201).send({
        status: true,
        message: "tableReqParticipantMapping updated successfully",
        data: tableReqParticipantMappingUpdated,
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  });


  router.delete("/:tableReqParticipantMapping", async (req, res) => {
    try {
      let { tableReqParticipantMappingId } = req.params;
      let tableReqParticipantMappingDeleted = await tableReqParticipantMapping.findOneAndUpdate(
        { _id: tableReqParticipantMappingId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      if (!tableReqParticipantMappingDeleted)
        return res
          .status(404)
          .send({ status: false, message: "tableReqParticipantMapping request not found" });
      return res.status(201).send({
        status: true,
        message: "tableReqParticipantMappingDeleted deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  });


  router.get("/:tableReqParticipantMapping", async (req, res) => {
    try {
      let { tableReqParticipantMappingId } = req.params;
      let tableReqParticipantMapping = await tableReqParticipantMapping.findOne({
        _id: tableReqParticipantMappingId,
        isDeleted: false,
      });
      if (!tableReqParticipantMapping)
        return res.status(404).send({ status: false, message: "tableReqParticipantMapping not found" });
      return res
        .status(200)
        .send({ status: true, message: "success", data: tableReqParticipantMapping });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  });

module.exports = router;