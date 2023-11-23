const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const User = require("../models/User");
const axios = require('axios');

const { ObjectId } = require("mongodb");

//call this endpoint when inviting a new or existing user. Invite done via phone number
router.post("/sendExternalInvite", async (req, res) => {
  console.log(req.body, "\n");
  const organizerId = req.body.organizerId;
  const phoneNumber = req.body.phoneNumber;
  const tableRequestId = req.body.tableRequestId;
  const joiningFee = req.body.joiningFee;

  try {
    // Find existing unaccepted invites that haven't been deleted by the user
    const invites = await Invite.find({
      invitee: phoneNumber,
      tableRequestId: tableRequestId,
      joiningFee: joiningFee,
      organizerId: organizerId,
      isAccepted: false,
      isDeleted: false,
    });

    let message = '';

    // Check if invites array is not empty
    if (invites.length > 0) {
      // Loop through the invites array and update each invite's isDeleted property
      for (const invite of invites) {
        invite.isDeleted = true;
        await invite.save();
      }
      message = "Existing invites marked as deleted. ";
    } 
    
    // Create a new invite if none are found or once old invites have been "deleted"
    const newInvite = new Invite({
      invitee: phoneNumber,
      tableRequestId: tableRequestId,
      joiningFee: joiningFee,
      organizerId: organizerId,
      isAccepted: false,
      isDeleted: false,
    });
    
    await newInvite.save();
    res.status(201).json({ message: message + "New invite created", invite: newInvite });
    
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});


// call this when inviting an in-app user
/*router.post("/sendInternalInvite", async (req, res) => {
  const organizerId = req.body.organizerId;
  const userName = req.body.userName;
  const tableReqId = req.body.tableReqId;
  const joiningFee = req.body.joiningFee;

  try {
    // First, find the user by the username
    const user = await User.findOne({ userName: userName, isDeleted: false });

    // If the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPhoneNumber = user.phoneNumber.toString(); // Convert phone number to string

    // Find existing unaccepted invites that haven't been deleted by the user
    const invites = await Invite.find({
      invitee: userPhoneNumber,
      tableReqId: tableReqId,
      joiningFee: joiningFee,
      organizerId: organizerId,
      isAccepted: false,
      isDeleted: false,
    });

    // Check if invites array is not empty
    if (invites.length > 0) {
      // Loop through the invites and mark each as deleted
      for (const invite of invites) {
        invite.isDeleted = true;
        await invite.save();
      }
      res.status(200).json({ message: "Existing invites marked as deleted" });
    } else {
      // Create a new invite if no existing invites are found
      const newInvite = new Invite({
        invitee: userPhoneNumber, // using the user's phone number
        tableReqId: tableReqId,
        joiningFee: joiningFee,
        organizerId: organizerId,
        isAccepted: false,
        isDeleted: false,
      });

      await newInvite.save();
      res
        .status(201)
        .json({ message: "New invite created", invite: newInvite });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});*/

// Endpoint to decline an invite
router.patch("/declineInvite", async (req, res) => {
  const inviteId = req.body.inviteId;

  try {
    // Find the invite by its ID
    const invite = await Invite.findById(inviteId);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    // Update the invite fields
    invite.isAccepted = false;
    invite.isDeleted = true;

    await invite.save();

    res.status(200).json({ message: "Invite declined", invite });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Endpoint to accept an invite
router.patch("/acceptInvite", async (req, res) => {
  const inviteId = req.body.inviteId;

  try {
    // Find the invite by its ID
    const invite = await Invite.findById(inviteId);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    // Update the invite fields
    invite.isAccepted = true;
    invite.isDeleted = false;

    await invite.save();

    res.status(200).json({ message: "Invite accepted", invite });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

//Endpoint to get list of all invites based on Phone number
router.get("/getListOfInvites/:phoneNumber", async (req, res) => {
  try {
    let { phoneNumber } = req.params;
    const requestsList = await Invite.find({ 
      invitee: phoneNumber,
      isDeleted: false 
    })
      .populate('tableRequestId organizerId')  // note the quotes here
      .lean();

    if (!requestsList.length) {
      return res.status(404).send({ message: "No invites found" });  // Using 404 status for not found
    }

    return res.status(200).send({ message: "Invites found", data: requestsList });
  } catch (error) {
    console.error("Error fetching invites:", error);
    return res.status(500).send({ message: "Internal server error" });  // Handling unexpected errors
  }
});


// Endpoint to delete an invite, when table request is closed
router.delete("/deleteInvite", async (req, res) => {
  const inviteId = req.body.inviteId;

  try {
    // Find the invite by its ID and remove it
    const invite = await Invite.findOneAndUpdate(
      { _id: inviteId },
      { isDeleted: true },
      { new: true }
    );

    if (!invite) {
      return res.status(404).json({ message: "Invite not found", invite: invite});
    }

    res.status(200).json({ message: "Invite successfully deleted", invite: invite });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
// 65296ed8ec848c037c1337ad invite id
// 65296aca1f4aa13f98c59d92 table req id