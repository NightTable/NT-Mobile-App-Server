const express = require("express");
// const { ObjectId } = require("mongodb");
const router = express.Router();
const Event = require("../models/Event");
const TableConfiguration = require("../models/TableConfiguration");

router.get("/customer/:userId", async (req, res) => {
    try {
        let userId = req.params.userId;
        const customer = await Customer.findOne({ userId: userId }).populate('userId');
      
        if (!customer) {
            return res.status(404).send({ status: false, message: "Customer not found" });
        }
  
        return res.status(200).send({ status: true, message: "Success", data: customer });
  
        } catch (err) {
            return res.status(500).send({
            status: false,
            message: "An error occurred while retrieving customer data"
        });
    }
});


// GET /api/events/event/:eventId - get the event details (date and name) via eventId
router.get("/event/:eventId", async (req, res) => {
  try {
    let { eventId } = req.params;
    let eventSchedule = await Event.findOne({ _id: eventId, isDeleted: false })
      .select({ eventDate: 1, eventTime: 1 })
      .lean();
    if (!eventSchedule)
      return res.status(200).send({ status: false, message: "no event found" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: eventSchedule });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
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
        .status(200)
        .send({ status: false, message: "event not found" });
    let tableDetailsForTheEvent;
    if (event.isTableConfigAdded) {
      tableDetailsForTheEvent = await TableConfiguration.find({
        eventId: eventId,
        isDeleted: false,
      }).lean();
      return res.status(200).send({
        status: true,
        message: "table for event found",
        eventData: event,
        tableConfigForEvent: tableDetailsForTheEvent,
      });
    }
    return res.status(200).send({
      status: true,
      message: "event found but no table config added",
      data: event,
    });
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
      return res.status(200).send({ status: false, message: "not found" });
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
      return res.status(200).send({ status: false, message: "not found" });
    return res
      .status(200)
      .send({ status: true, messages: "successfully deleted" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
