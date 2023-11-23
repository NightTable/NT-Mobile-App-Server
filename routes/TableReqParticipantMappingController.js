const express = require("express");
const Participant = require("../models/Participant");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const TableReqParticipantMapping = require("../models/TableRequestParticipantMapping");



router.post("/createTableReqParticipantMapping", async (req, res) => {
    try {
      let phoneNumber = req.body.phoneNumber;
      let isPaymentInfoRegistered = false;
      let userId = req?.body?.userId;

      const participantData = {
        phoneNumber: phoneNumber,
        isPaymentInfoRegistered: isPaymentInfoRegistered,
        ...(userId ? { userId: userId } : {}) // Include userId only if it's not null/undefined
      };
      

      const participant = await Participant.create(participantData);
      console.log(participant, "participant\n");
      console.log(participant.id, "participant\n");

      let tableReqId = req.body.tableRequestId;
      console.log(tableReqId, "tableReqId");

      let minimumPrice = req.body.minimumPrice;
      console.log(minimumPrice, "minimumPrice");

      let isRequestOrganizer = req.body.isRequestOrganizer;
      console.log(isRequestOrganizer, "isRequestOrganizer");

      let isInvitedPending = req.body.isInvitedPending;
      console.log(isInvitedPending, "isInvitedPending");

      let isActiveParticipant = req.body.isActiveParticipant;
      console.log(isActiveParticipant, "isActiveParticipant");

      let trpm = await TableReqParticipantMapping.create({
        tableReqId: tableReqId,
        participantId: participant.id,
        isRequestOrganizer: isRequestOrganizer,
        minimumPrice: minimumPrice,
        isActiveParticipant: isActiveParticipant,
        isInvitedPending: isInvitedPending
      });
      console.log(trpm, "tableReqParticipantMapping");


      trpm = await trpm.populate('participantId');

      return res.status(201).send({
        status: true,
        message: "tableReqParticipantMapping created successfully",
        data: trpm,
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


  /* router.get("/tableRequest/:tableReqId", async (req, res) => {
    try {
      let tableReqId = req.params.tableReqId;
  
      // Find the tableReqParticipantMapping documents
      let tableReqParticipantMappings = await TableReqParticipantMapping.find({
        tableReqId: tableReqId,
        isDeleted: false,
      })
      .populate({
        path: 'tableReqId',
        populate: [
          { path: 'eventId' },
          { path: 'clubId' },
          { path: 'organizerUserId' }
        ]
      })
      //.populate('participantId');  // Initially populate participantId
      console.log(tableReqParticipantMappings, "tableReqParticipantMappings\n");

      for (let i = 0; i < tableReqParticipantMappings.length; i++) {
        let variable = await tableReqParticipantMappings[i].populate('participantId');
        console.log(variable, "variable\n");
      }

       // Conditional population for userId if it exists
      for (let mapping of tableReqParticipantMappings) {
        if (mapping.participantId && mapping.participantId.userId) {
          await mapping.populate({ path: 'participantId.userId' }).execPopulate();
        } 
      }
  
      if (tableReqParticipantMappings.length === 0) {
        return res.status(404).send({ status: false, message: "TableReqParticipantMapping not found" });
      }
  
      return res.status(200).send({ status: true, message: "success", data: tableReqParticipantMappings });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }); 
  */
  
  
  
  

  router.get("/tableRequest/:tableReqId", async (req, res) => {
    try {
      let tableReqId = req.params.tableReqId;
  
      // Find the tableReqParticipantMapping documents
      let tableReqParticipantMappings = await TableReqParticipantMapping.find({
        tableReqId: tableReqId,
        isDeleted: false,
      })
      .populate({
        path: 'tableReqId',
        populate: [
          { path: 'eventId' },
          { path: 'clubId' },
          { path: 'organizerUserId' }
        ]
      })
      .populate('participantId');  // Initially populate participantId
  
      // Conditional population for userId if it exists
      for (let mapping of tableReqParticipantMappings) {
        if (mapping.participantId && mapping.participantId.userId) {
          await mapping.populate({ path: 'participantId.userId' });
        }
      }
  
      if (tableReqParticipantMappings.length === 0) {
        return res.status(404).send({ status: false, message: "TableReqParticipantMapping not found" });
      }
  
      return res.status(200).send({ status: true, message: "success", data: tableReqParticipantMappings });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  });
  
  
  

module.exports = router;