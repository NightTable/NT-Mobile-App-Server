const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const participant = require("../models/Participant");

router.post("/participant", async (req, res) => {
  try {
    let partipantBody = req.body;
    let participant = await participant.create(partipantBody);
    return res.status(201).send({
      status: true,
      message: "participant created successfully",
      data: participant,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.put("/:participantId", async (req, res) => {
  try {
    let participantUpdateBody = req.body;
    let { participantId } = req.params;
    let participantUpdated = await participant.findOneAndUpdate(
      { _id: participantId, isDeleted: false },
      participantUpdateBody,
      { new: true }
    );
    if (!participantUpdated)
      return res
        .status(404)
        .send({ status: false, message: "participant not found" });
    return res.status(201).send({
      status: true,
      message: "participant updated successfully",
      data: participantUpdated,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.delete("/:participantId", async (req, res) => {
  try {
    let { participantId } = req.params;
    let particpantDeleted = await participant.findOneAndUpdate(
      { _id: participantId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!particpantDeleted)
      return res
        .status(404)
        .send({ status: false, message: "participant request not found" });
    return res.status(201).send({
      status: true,
      message: "participant deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/:participantId", async (req, res) => {
  try {
    let { participantId } = req.params;
    let participant = await participant.findOne({
      _id: participantId,
      isDeleted: false,
    });
    if (!participant)
      return res.status(404).send({ status: false, message: "participant not found" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: participant });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
