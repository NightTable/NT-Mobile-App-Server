const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const TableRequest = require("../models/TableRequest");
const TableRequestParticipantMapping = require("../models/TableRequestParticipantMapping");
const TableConfiguration = require("../models/TableConfiguration");
const Participant = require("../models/Participant");
const User = require("../models/User");
const Room = require("../models/Room");
const UserFriendMapping = require("../models/UserFriendMapping");

router.get("/tablereq/:tableReqId", async (req, res) => {
  try {
    let tableReqId = req.params.tableReqId;
    let tableReq = await TableRequest.findOne({ _id: tableReqId, isDeleted: false}).populate(
      "tableConfigId organizerUserId promoterId"
    );
    if (!tableReq)
      return res.status(400).send({ status: false, message: "false" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: tableReq });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.post('/tableReq', async (req,res) =>{
  try{
    let tableReqBody = req.body;
    let tableReq = await TableRequest.create(tableReqBody);
    return res.status(201).send({
      status: true,
      message: "tableRequest created successfully",
      data: tableReq,
    });

  }catch(error){
    return res.status(500).send({ status: false, message: error.message });
  }
})


router.put('/tableReq/:tableReqId', async (req,res) =>{
  try{
    let tableReqUpdateBody = req.body;
    let {tableReqId} = req.params;
    let tableReqUpdated = await TableRequest.findOneAndUpdate({_id:tableReqId, isDeleted: false},tableReqUpdateBody, {new:true});
    if(!tableReqUpdated) return res.status(404).send({status:false, message:"table request not found"})
    return res.status(201).send({
      status: true,
      message: "tableRequest updated successfully",
      data: tableReqUpdated,
    });

  }catch(error){
    return res.status(500).send({ status: false, message: error.message });
  }
})


router.delete('/tableReq/:tableReqId', async (req,res) =>{
  try{
    let {tableReqId} = req.params;
    let tableReqDeleted = await TableRequest.findOneAndUpdate({_id:tableReqId, isDeleted: false},{isDeleted:true}, {new:true});
    if(!tableReqDeleted) return res.status(404).send({status:false, message:"table request not found"})
    return res.status(201).send({
      status: true,
      message: "tableRequest deleted successfully",
    });

  }catch(error){
    return res.status(500).send({ status: false, message: error.message });
  }
})

router.get("/tablereq/:tableConfigId/:eventId", async (req, res) => {
  try {
    let {tableConfigId, eventId} = req.params;
    let tableReq = await TableRequest.findOne({tableConfigId: tableConfigId, isDeleted: false,eventId:eventId }).populate(
      "tableConfigId organizerUserId promoterId"
    );
    if (!tableReq)
      return res.status(400).send({ status: false, message: "false" });
    return res
      .status(200)
      .send({ status: true, message: "success", data: tableReq });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});
// router.get("/club/:clubId", async (req, res) => {
//   try {
//     let clubId = req.params.clubId;
//     let tableReqs = await TableRequest.find().populate({
//       path: "tableConfigId",
//       match: { clubId: clubId },
//     });

//     //will have to check how to make this work
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// });




// router.get("/tablereq/:tablereqid", async (req, res) => {
//   let tableRequestIdParam = req.params.tablereqid;

//   let retrievedTableRequestObject = null;
//   try {
//     retrievedTableRequestObject = await TableRequest.findById(
//       new ObjectId(tableRequestIdParam)
//     );

//     const tableReqObject = retrievedTableRequestObject.toObject();

//     const tableReqTableConfig = await TableConfiguration.findById(
//       retrievedTableRequestObject.tableConfigId
//     );

//     const pendingParticipantsUserObjects = [];
//     const currentParticipantsUserObjects = [];
//     const organizerParticipantUserObjects = [];
//     const allParticipants = await TableRequestParticipantMapping.find({
//       tableReqId: retrievedTableRequestObject.id,
//     });

//     for (let i = 0; i < allParticipants.length; i++) {
//       if (
//         allParticipants[i].isInvitedPending &&
//         !allParticipants[i].isRequestOrganizer
//       ) {
//         const tempPendingParticipantObject = await Participant.findById(
//           new ObjectId(allParticipants[i].participantId)
//         );
//         const pendingParticipantUserObject =
//           await tempPendingParticipantObject.populate("userId");
//         pendingParticipantsUserObjects.push(pendingParticipantUserObject);
//       }
//       if (
//         allParticipants[i].isActiveParticipant &&
//         !allParticipants[i].isRequestOrganizer
//       ) {
//         const tempCurrentParticipantObject = await Participant.findById(
//           new ObjectId(allParticipants[i].participantId)
//         );
//         const currentParticipantObject =
//           await tempCurrentParticipantObject.populate("userId");
//         currentParticipantsUserObjects.push(currentParticipantObject);
//       }
//       if (allParticipants[i].isRequestOrganizer) {
//         const tempOrganizerParticipantObject = await Participant.findById(
//           new ObjectId(allParticipants[i].participantId)
//         );
//         const organizerParticipantObject =
//           await tempOrganizerParticipantObject.populate("userId");
//         organizerParticipantUserObjects.push(organizerParticipantObject);
//       }
//     }

//     tableReqObject["pendingParticipants"] = pendingParticipantsUserObjects;
//     tableReqObject["currentParticipants"] = currentParticipantsUserObjects;
//     tableReqObject["organizerUserObjects"] = organizerParticipantUserObjects;
//     tableReqObject["tableConfigDetails"] = await tableReqTableConfig.populate();

//     res.json(tableReqObject);

//     return;
//   } catch (err) {
//     res
//       .status(400)
//       .send({
//         message:
//           "Invalid request - We could not retrieve that specific table request",
//       });
//     return;
//   }
// });

// router.get("/club/:clubid", async (req, res) => {
//   let clubIdParam = req.params.clubid;

//   let retrievedTableRequestObjects = null;

//   try {
//     retrievedTableRequestObjects = await TableRequest.find({
//       clubId: new ObjectId(clubIdParam),
//     });
//     console.log(retrievedTableRequestObjects, "retrievedTableRequestObjects\n");

//     let modifiedTableRequestList = [];

//     for (let i = 0; i < retrievedTableRequestObjects.length; i++) {
//       let retrievedTableObject = retrievedTableRequestObjects[i];
//       console.log(retrievedTableObject, "retrievedTableObject\n");

//       let associatedTableParticipantMapping =
//         await TableRequestParticipantMapping.find({
//           tableReqId: new ObjectId(retrievedTableObject.id),
//         });
//       console.log(
//         associatedTableParticipantMapping,
//         "associatedTableParticipantMapping\n"
//       );

//       for (let j = 0; j < associatedTableParticipantMapping.length; j++) {
//         let tableParticipantMappingObject =
//           associatedTableParticipantMapping[j];
//         console.log(
//           tableParticipantMappingObject,
//           "tableParticipantMappingObject\n"
//         );

//         if (tableParticipantMappingObject.isRequestOrganizer) {
//           let convertedTableObject = retrievedTableObject.toObject();
//           console.log(convertedTableObject, "convertedTableObject\n");

//           let orgPartId = tableParticipantMappingObject.participantId;
//           console.log(orgPartId, "orgPartId\n");
//           let orgParticipantObject = await Participant.findById(
//             new ObjectId(orgPartId)
//           );
//           console.log(orgParticipantObject, "orgParticipantObject\n");
//           let orgUserObj = await User.findById(
//             new ObjectId(orgParticipantObject.userId)
//           );
//           console.log(orgUserObj, "orgUserObj\n");
//           let orgProfilePic = orgUserObj.profilePhoto;
//           console.log(orgProfilePic, "orgProfilePic\n");
//           let orgName = orgUserObj.firstName + " " + orgUserObj.lastName;
//           console.log(orgName, "orgName\n");
//           modifiedTableRequestList.push({
//             ...convertedTableObject,
//             organizerId: tableParticipantMappingObject.participantId,
//             photo: orgProfilePic,
//             name: orgName,
//           });
//           console.log(modifiedTableRequestList, "modifiedTableRequestList\n");
//         }
//       }
//     }

//     res.json(modifiedTableRequestList);
//     return;
//   } catch (err) {
//     res.status(400).send({
//       message:
//         "Invalid request - We could not find any table requests from the specified club ID",
//     });
//     return;
//   }
// });

// This endpoint will delete the table request itself as well as all
// table request participant mappings -- only used for testing most likely

// router.delete("/:tablereqid/:participantId", async (req, res) => {
//   let tableReqIdParam = req.params.tablereqid;
//   let participantIdParam = req.params.participantId;

//   try {
//     await TableRequestParticipantMapping.deleteMany({
//       tableReqId: new ObjectId(tableReqIdParam),
//     });

//     await TableRequest.deleteOne({ _id: new ObjectId(tableReqIdParam) });

//     res.json({ message: "Table Request was successfully deleted" });
//   } catch (err) {
//     res.status(400).send({
//       message:
//         "Invalid request - We were not able to delete the table request ",
//     });
//   }
// });

// router.get("/tablereq/:tablereqid", async (req, res) => {
//   let tableRequestIdParam = req.params.tablereqid;

//   let retrievedTableRequestObject = null;

//   try {
//     retrievedTableRequestObject = await TableRequest.findById(
//       new ObjectId(tableRequestIdParam)
//     );
//     res.json(retrievedTableRequestObject);
//     return;
//   } catch (err) {
//     res.status(400).send({
//       message:
//         "Invalid request - We could not retrieve that specific table request",
//     });
//     return;
//   }
// });

// router.post("/participant/:participantid", async (req, res) => {
//   const organizerId = req.params.participantid;
//   let nameParam = null;
//   let tableConfigIdParam = null;
//   let costSplitTypeParam = null;
//   let clubIdParam = null;
//   let participantIdsParam = null;
//   let externalEmailsParam = null;
//   let additionalAmountParam = null;

//   try {
//     nameParam = req.body.name;
//     tableConfigIdParam = req.body.tableConfigId;
//     costSplitTypeParam = req.body.costSplitType;
//     clubIdParam = req.body.clubId;
//     participantIdsParam = req.body.participantIds;
//     externalEmailsParam = req.body.externalEmails;
//     additionalAmountParam = req.body.additionalAmount;

//     let participants = [];
//     let orgUserParticipant = await Participant.findById(
//       new ObjectId(organizerId)
//     );
//     let orgUserParticipantId = orgUserParticipant.userId;
//     let orgUser = await User.findById(new ObjectId(orgUserParticipantId));
//     let tableConfig = await TableConfiguration.findById(
//       new ObjectId(tableConfigIdParam)
//     );
//     const tableConfigPrice = tableConfig.price;

//     participants.push({
//       tableRequestId: null,
//       partId: organizerId,
//       minPrice:
//         tableConfigPrice /
//         (participantIdsParam.length + externalEmailsParam.length),
//       addAmount: additionalAmountParam,
//       isOrganizer: true,
//       gender: orgUser.gender,
//     });
//     for (let i = 0; i < participantIdsParam.length; i++) {
//       let invitedPartId = participantIdsParam[i];
//       let invitedParticipant = await Participant.findById(
//         new ObjectId(invitedPartId)
//       );
//       let invitedPartUserId = invitedParticipant.userId;
//       let invitedPartUser = await User.findById(
//         new ObjectId(invitedPartUserId)
//       );

//       participants.push({
//         tableRequestId: null,
//         partId: invitedPartId,
//         minPrice:
//           tableConfigPrice /
//           (participantIdsParam.length + externalEmailsParam.length),
//         addAmount: 0,
//         isOrganizer: false,
//         gender: invitedPartUser.gender,
//       });
//     }

//     for (let i = 0; i < externalEmailsParam.length; i++) {
//       let externalParticipant = await Participant.create({
//         userId: null,
//         email: externalEmailsParam[i],
//         isExternalUser: true,
//         isPaymentInfoRegistered: false,
//       });
//       await externalParticipant.save();

//       participants.push({
//         tableRequestId: null,
//         partId: externalParticipant._id,
//         minPrice:
//           tableConfigPrice /
//           (participantIdsParam.length + externalEmailsParam.length),
//         addAmount: 0,
//         isOrganizer: false,
//         gender: null,
//       });
//     }

//     let males = 0;
//     let females = 0;

//     for (let i = 0; i < participants.length; i++) {
//       if (participants[i].gender == "male") {
//         males += 1;
//       }
//       if (participants[i].gender == "female") {
//         females += 1;
//       }
//     }
//     let ratio = null;
//     if (females == 0) {
//       ratio = 1;
//     } else if (males == 0) {
//       ratio = 0;
//     } else {
//       ratio = males / females;
//     }

//     let availableSpots = null;
//     if (tableConfig.size < participants.length) {
//       availableSpots = 0;
//       res
//         .status(400)
//         .send({ message: "table size is less than number of participants" });
//     } else {
//       availableSpots = tableConfig.size - participants.length;
//     }
//     let newTableReq = await TableRequest.create({
//       name: nameParam,
//       tableConfigId: tableConfigIdParam,
//       costSplitType: costSplitTypeParam,
//       taken: participants.length,
//       available: availableSpots,
//       mfRatio: ratio,
//       isPolling: true,
//       isActive: false,
//       isClosed: false,
//       requestPlacementTime: Date.now(),
//       activeGroupStartTime: null,
//       clubId: clubIdParam,
//     });
//     await newTableReq.save();
//     if (costSplitTypeParam == "pnsl") {
//       await TableConfiguration.findOneAndUpdate(
//         { _id: new ObjectId(tableConfig.id) },
//         { availabilityCount: tableConfig.availabilityCount - 1 }
//       );
//     }

//     for (let i = 0; i < participants.length; i++) {
//       participants[i].tableRequestId = newTableReq.id;
//     }

//     const room = await Room.create({
//       tableRedId: newTableReq.id,
//     });
//     await room.save();

//     for (let i = 0; i < participants.length; i++) {
//       let tableRequestParticipantMap =
//         await TableRequestParticipantMapping.create({
//           tableReqId: participants[i].tableRequestId,
//           participantId: participants[i].partId,
//           minimumPrice: participants[i].minPrice,
//           voluntaryShare: participants[i].addAmount,
//           costContribution:
//             participants[i].minPrice + participants[i].addAmount,
//           isRequestOrganizer: participants[i].isOrganizer,
//           isInvitedPending: true,
//           isAccepted: false,
//           isActiveParticipant: false,
//           isRequestDefaultEntry: false,
//           customPrice: null,
//           isCustomPriceRequested: false,
//           isCustomPriceGranted: false,
//           isCostContributionFinalized: false,
//         });
//       await tableRequestParticipantMap.save();
//     }
//     res.json(newTableReq);
//   } catch (error) {
//     res.status(400).send({
//       message: "Invalid request - the table request could not be created",
//     });
//     return;
//   }
// });

// router.get("/participant/:participantid", async (req, res) => {
//   let participantIdParam = req.params.participantid;
//   let participantMappingObjects = null;

//   try {
//     const associatedParticipant = await Participant.findById(
//       new ObjectId(participantIdParam)
//     );
//     const associatedUserId = associatedParticipant.userId;

//     participantMappingObjects = await TableRequestParticipantMapping.find({
//       participantId: new ObjectId(participantIdParam),
//     }).populate({ path: "tableReqId" });

//     let selectedTableObjects = [];
//     for (let i = 0; i < participantMappingObjects.length; i++) {
//       let localParticipantMappingObject = participantMappingObjects[i];
//       let localTableObjectTableConfigExpanded =
//         await localParticipantMappingObject.tableReqId.populate(
//           "tableConfigId"
//         );
//       let fullTableObjectExpanded =
//         await localTableObjectTableConfigExpanded.populate("clubId");

//       const organizerParticipantObject = (
//         await TableRequestParticipantMapping.find({
//           tableReqId: localParticipantMappingObject.tableReqId.id,
//           isRequestOrganizer: true,
//         }).populate("participantId")
//       )[0].participantId;

//       const organizerUserObject = (
//         await organizerParticipantObject.populate("userId")
//       ).userId;

//       const retrievedOrganizerName = `${organizerUserObject.firstName} ${organizerUserObject.lastName}`;
//       const retrievedOrganizerProfilePic = organizerUserObject.profilePhoto;

//       const otherTableParticipants = [];

//       const tableReqFriendMappings = await TableRequestParticipantMapping.find({
//         tableReqId: fullTableObjectExpanded.id,
//       }).populate("participantId");

//       for (let j = 0; j < tableReqFriendMappings.length; j++) {
//         otherTableParticipants.push(
//           tableReqFriendMappings[j].participantId.userId.toString()
//         );
//       }

//       const friendMappingObjects = await UserFriendMapping.find({
//         sourceId: associatedUserId,
//       });

//       let dynamicFriendCount = 0;

//       if (friendMappingObjects.length !== 0) {
//         for (let j = 0; j < friendMappingObjects.length; j++) {
//           if (
//             otherTableParticipants.includes(
//               friendMappingObjects[j].targetId.toString()
//             )
//           ) {
//             dynamicFriendCount++;
//           }
//         }
//       }

//       const constructedTableObject = {
//         id: fullTableObjectExpanded.id,
//         name: fullTableObjectExpanded.name,
//         tableConfigId: fullTableObjectExpanded.tableConfigId.id,
//         tableConfigRecommendedSize: fullTableObjectExpanded.tableConfigId.size,
//         costSplitType: fullTableObjectExpanded.costSplitType,
//         taken: fullTableObjectExpanded.taken,
//         available: fullTableObjectExpanded.available,
//         mfRatio: fullTableObjectExpanded.mfRatio,
//         isPolling: fullTableObjectExpanded.isPolling,
//         isActive: fullTableObjectExpanded.isActive,
//         isClosed: fullTableObjectExpanded.isClosed,
//         requestPlacementTime: fullTableObjectExpanded.requestPlacementTime,
//         activeGroupStartTime: fullTableObjectExpanded.activeGroupStartTime,
//         clubId: fullTableObjectExpanded.clubId.id,
//         clubName: fullTableObjectExpanded.clubId.name,
//         numFriends: dynamicFriendCount,
//         tableOrganizerName: retrievedOrganizerName,
//         tableOrganizerProfilePic: retrievedOrganizerProfilePic,
//       };

//       selectedTableObjects.push(constructedTableObject);
//     }
//     res.json(selectedTableObjects);
//   } catch (err) {
//     res.status(400).send({
//       message:
//         "Invalid request - We could not find any table requests from the specified participant ID",
//     });
//   }
// });

// router.get("/tablereqquery", async (req, res) => {
//   let queryObject = req.query;
//   let tableSizeParam = queryObject.tablesize;
//   let priceParam = queryObject.price;
//   let mfratioParam = queryObject.mfratio;
//   let clubIdParam = queryObject.clubId;

//   try {
//     let tableConfigs = await TableConfiguration.find({
//       price: { $lte: priceParam },
//       clubId: new ObjectId(clubIdParam),
//       size: tableSizeParam,
//     });
//     let result = [];
//     for (let i = 0; i < tableConfigs.length; i++) {
//       let tableRequests = await TableRequest.find({
//         tableConfigId: new ObjectId(tableConfigs[i].id),
//         mfRatio: { $gte: mfratioParam },
//       });
//       for (let j = 0; j < tableRequests.length; j++) {
//         result.push(tableRequests[j]);
//       }
//     }
//     res.json(result);
//   } catch (error) {
//     res.json({
//       message: `Invalid request - we could not find any table requests matching the specified filter requirements`,
//     });
//     return;
//   }
// });

module.exports = router;
