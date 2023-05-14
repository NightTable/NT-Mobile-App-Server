const express = require("express");
// const { ObjectId } = require("mongodb");
const router = express.Router();
const Event = require("../models/Event");

router.get("/club/:clubid", async (req, res) => {
  try {
    let clubId = req.params.clubid;
    let date = req.body.date;
    let filter;
    if(date){
      filter = {
        clubId: clubId, isDeleted: false, eventDate: date
      }
    }else{
      filter = {
        clubId: clubId, isDeleted: false
      }
    }
    const eventResults = await Event.find(filter);
    if (!eventResults.length)
      return res
        .status(404)
        .send({ status: false, message: "No events found for the club" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: eventResults });
  } catch (err) {
    return res.status(500).send({
      message:
        "Invalid request - were not able to retreive event information from the given club",
    });
  }
});

router.get("/club/:clubId/:eventId", async (req, res) => {
  try {
    let { clubId, eventId } = req.params;
    let event = await Event.findOne({
      clubId: clubId,
      _id: eventId,
      isDeleted: false,
    }).lean();
    if (!event)
      return res
        .status(404)
        .send({ status: false, message: "event not found" });

    return res
      .status(200)
      .send({ status: true, message: "event found", data: event });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.post("/club/:clubid", async (req, res) => {
  try {
    const clubId = req.params.clubid;
    let eventBody = req.body;
    let event = await Event.create(eventBody);
    return res.status(201).send({
      status: true,
      message: "event created successfully",
      data: event,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Invalid request -- We were unable to create a new event`,
    });
  }
});

router.put("/club/:clubId/:eventId", async (req, res) => {
  try {
    let { clubId, eventId } = req.params;
    let updatedClubData = req.body;
    let updatedClub = await Event.findOneAndUpdate(
      { clubId: clubId, _id: eventId, isDeleted: false },
      updatedClubData,
      { new: true }
    );
    if (!updatedClub)
      return res.status(404).send({ status: false, message: "not found" });
    return res.status(200).send({
      status: true,
      message: "successfully updated",
      data: updatedClub,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.delete("/club/:clubId/:eventId", async (req, res) => {
  try {
    let { clubId, eventId } = req.params;
    let deletedClub = await Event.findOneAndUpdate(
      { clubId: clubId, _id: eventId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedClub)
      return res.status(404).send({ status: false, message: "not found" });
    return res
      .status(200)
      .send({ status: true, messages: "successfully deleted" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
