const express = require("express");
const router = express.Router();
const clubCollection = require("../models/Club");
const eventCollection = require("../models/Event");
const userCollection = require("../models/User");
const respresentativeCollection = require("../models/Representative");
const tableRequestsCollection = require("../models/TableRequest");
const tableConfigurationsCollection = require("../models/TableConfiguration");
// getapi/clubs/clubId -- get club viaclubId
// New Table Request Screen
// GET /api/customRoutes/clubs/:clubId - get the club at which the table request is being made at via clubId, get the name of the club
router.get("/clubs/:clubId", async (req, res) => {
  try {
    let clubId = req.params.clubId;
    const reqClub = await clubCollection
      .findOne({
        _id: clubId,
        isDeleted: false,
      })
      .lean();
    if (!reqClub)
      return res
        .status(200)
        .send({ status: false, message: "Club  not found" });
    return res
      .status(200)
      .send({ status: true, message: "club found", data: reqClub });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

// GET /api/events/event/:eventId - get the event details (date and name) via eventId
router.get("/event/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let reqEvent = await eventCollection
      .findOne({ _id: eventId, isDeleted: false })
      .lean();
    if (!reqEvent)
      return res
        .status(200)
        .send({ status: false, message: "event not found" });
    return res
      .status(200)
      .send({ status: true, message: "event found", data: reqEvent });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});
// GET /api/users/:userId - get the user object that’s creating the reques via userIdt, get the user’s name, check whether he’s a promoter/host/club representative
router.get("/user/:userId", async (req, res) => {
  try {
    let id = req.params.userId;
    let user;
    user = await userCollection.findOne({ _id: id, isDeleted: false }).lean();
    if (!user) {
      user = await respresentativeCollection
        .findOne({ _id: id, isDeleted: false })
        .lean();
      if (!user)
        return res
          .status(200)
          .send({ status: false, message: "no user or representative found" });
      return res
        .status(200)
        .send({ status: true, message: "representative", data: user });
    }
    return res.status(200).send({ status: true, message: "user", data: user });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});
// GET /api/clubs/floorplan/:clubId - get the floorplan of the club via clubId
router.get("/floorPlan/:clubId", async (req, res) => {
  try {
    let clubId = req.params.clubId;
    let club = await clubCollection
      .findOne({ _id: clubId, isDeleted: false })
      .lean();
    if (!club)
      return res.status(200).send({ status: false, message: "no club found" });
    return res
      .status(200)
      .send({ status: true, message: "club found", floorplan: club.floorPlan });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});
// GET /api/tableconfigurations/tableconfiguration/:eventId - get the tables that aren’t bought out for an event
router.get("/tableConfigurations/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let configOfNotActiveTableRequests = await tableRequestsCollection
      .find({ eventId: eventId, isActive: false, isDeleted: false })
      .select({ _id: 0, tableConfigId: 1 })
      .lean();
    if (!configOfNotActiveTableRequests.length)
      return res
        .status(200)
        .send({ status: false, message: "no such tableconfig" });
    let tableConfigsWithNoActiveTableRequests =
      await tableConfigurationsCollection
        .find({
          _id: { $in: configOfNotActiveTableRequests },
          isDeleted: false,
        })
        .lean();
    if (!tableConfigsWithNoActiveTableRequests)
      return res
        .status(200)
        .send({ status: false, message: "table config not found" });
    return res.status(200).send({
      status: true,
      message: "table configs found",
      data: tableConfigsWithNoActiveTableRequests,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

// GET /api/users/tablemins/:userId - get a boolean value telling you whether this user can change table minimums
router.get("/tablemins/:representativeId", async (req, res) => {
  try {
    let repId = req.params.representativeId;
    let repPermission = await respresentativeCollection
      .findOne({ _id: repId, isDeleted: false })
      .select({ role: 1 })
      .lean();
    if (!repPermission)
      return res
        .status(200)
        .send({ status: false, message: "no representative found" });

    if (
      repPermission.role == "godfather" ||
      repPermission.role == "host" ||
      repPermission.role == "promoter"
    ) {
      return res
        .status(200)
        .send({ status: true, message: "can change table minimums" });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "cannot change table minimums" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});
// POST /api/clubs/timings/:eventId - get the operating hours of the events of aclub with their date and time
// we dont have any time key in our club collection
//get event date and event time
router.get("/timings/:eventId", async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let eventSchedule = await eventCollection
      .findOne({ _id: eventId, isDeleted: false })
      .select({ eventDate: 1, eventTime: 1, name: 1, picture: 1 });

    if (!eventSchedule)
      return res
        .status(200)
        .send({ status: false, message: "event not found" });

    return res
      .status(200)
      .send({ status: true, message: "event details", data: eventSchedule });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

// An endpoint to get invitees via inhouse (people who are friend with the organizer or promoter), number, and email and add to the list of invited participants
        //to invite people vianumber emails -- if not signed up user will be asked to signup
        //to be implmented later



// This screen will require the use of WebSockets as both the promoter/host and organizer should be able to interact with this screen in real time. TableConfigurations can also change in real time as well as availability - meaning that if someone else buys table via pnsl before you, it should reflect.

// Table Request Confirmation Screen
// An endpoint get all the MenuCategories and corresponding MenuItems
// WebSockets are to be used here as someone else who buys and pays for the table before you should be reflected.

// Payment Detail Screen
// Endpoint to place a hold on card when SNPL
// Endpoint to place a full charge card when PNSL
// Endpoint to create a new ItemOrder (place orders of the customer)
// Endpoint to create a TableRequest
// Endpoint to create TableRequesParticipantMapping object
// Endpoint to create a Participant
// Endpoint to create a Customer
// https://stripe.com/docs/payments/accept-a-payment?platform=ios&ui=custom
// https://stripe.com/docs/payments/more-payment-scenarios
// https://stripe.com/docs/payments/place-a-hold-on-a-payment-method

// Polling Room Screen
// Endpoint to get name of the organizer
// Endpoint to get info on how many people are on the table and how many more are needed
// Endpoint to get selection of tables
// Endpoint to get ETA
// Endpoint to main photo of club
// Endpoint to get the following info on
// Invited current participants and how much they’re contributing
// Invited pending participants and how much they’re contributing
// Endpoing to get total table minimum
// Endponit to get profile pictures of all signed up users
// Endpoint to get all custom share requests
// Endpoint to send new custom share requests
// Endpoint to accept new share requests and update table requests accordingly
// Endpoint to get floor plan of the club
// Endpoint to get the menu of the club
// Endpoint to place more alcohol orders
// Endpoint to add to the general tab
// Endpoint to approve the request and make the table request active
// Endpoint to remove participants from the invited current participants list
// Endpoint to add and invite participants
// Endpoint to request to join a table as a potential user
// This screen will be using websockets to reflect the ongoing changes in who comes and joins the group, how much each person pays, etc

// Active Table Group Screen
// Endpoint to get name of the organizer
// Endpoint to get info on how many people are on the table and how many more are needed
// Endpoint to get selection of tables
// Endpoint to get ETA
// Endpoint to main photo of club
// Endpoint to get the following info on
// Invited current participants and how much they’re contributing
// Invited pending participants and how much they’re contributing
// Endpoing to get total table minimum
// Endponit to get profile pictures of all signed up users
// Endpoint to get all custom share requests
// Endpoint to send new custom share requests
// Endpoint to accept new share requests and update table requests accordingly
// Endpoint to get floor plan of the club
// Endpoint to get the menu of the club
// Endpoint to place more alcohol orders
// Endpoint to add to the general tab
// Endpoint to approve the request and make the table request active
// Endpoint to remove participants from the invited current participants list
// Endpoint to add and invite participants
// Endpoint to request to join a table as a potential user
// Endpoint to end the table request
// This screen will be using websockets to reflect the ongoing changes in who comes and joins the group, how much each person pays, etc

module.exports = router;
