const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const User = require("../models/User");

const { ObjectId } = require("mongodb");

//call this endpoint when inviting a new user
router.post("/sendExternalInvite", async (req, res) => {
    const organizerId = req.body.organizerId;
    const phoneNumber = req.body.phoneNumber;
    const tableReqId = req.body.tableReqId;
    const joiningFee = req.body.joiningFee;

    try {
        // Find existing unaccepted invites that haven't been deleted by the user
        const invites = await Invite.find({
            invitee: phoneNumber,
            tableReqId: tableReqId,
            joiningFee: joiningFee,
            organizerId: organizerId,
            isAccepted: false,
            isDeleted: false,
        });

        // Check if invites array is not empty
        if (invites.length > 0) {
            // Loop through the invites array and update each invite's isDeleted property
            for (const invite of invites) {
                invite.isDeleted = true;
                await invite.save();
            }
            res.status(200).json({ message: 'Existing invites marked as deleted' });
        } else {
            // Create a new invite if none are found
            const newInvite = new Invite({
                invitee: phoneNumber,
                tableReqId: tableReqId,
                joiningFee: joiningFee,
                organizerId: organizerId,
                isAccepted: false,
                isDeleted: false
            });
            await newInvite.save();
            res.status(201).json({ message: 'New invite created', invite: newInvite });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// call this when inviting an in-app user
router.post("/sendInternalInvite", async (req, res) => {
    const organizerId = req.body.organizerId;
    const userName = req.body.userName;
    const tableReqId = req.body.tableReqId;
    const joiningFee = req.body.joiningFee;

    try {
        // First, find the user by the username
        const user = await User.findOne({ userName: userName, isDeleted: false });
        
        // If the user does not exist, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
            res.status(200).json({ message: 'Existing invites marked as deleted' });
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
            res.status(201).json({ message: 'New invite created', invite: newInvite });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// Endpoint to decline an invite
router.patch('/declineInvite', async (req, res) => {
    const inviteId = req.body.inviteId;

    try {
        // Find the invite by its ID
        const invite = await Invite.findById(inviteId);

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        // Update the invite fields
        invite.isAccepted = false;
        invite.isDeleted = true;

        await invite.save();

        res.status(200).json({ message: 'Invite declined', invite });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// Endpoint to accept an invite
router.patch('/acceptInvite', async (req, res) => {
    const inviteId = req.body.inviteId;

    try {
        // Find the invite by its ID
        const invite = await Invite.findById(inviteId);

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        // Update the invite fields
        invite.isAccepted = true;
        invite.isDeleted = false;

        await invite.save();

        res.status(200).json({ message: 'Invite accepted', invite });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// Endpoint to delete an invite, when table request is closed
router.delete('/deleteInvite', async (req, res) => {
    const inviteId = req.body.inviteId;

    try {
        // Find the invite by its ID and remove it
        const invite = await Invite.findByIdAndRemove(inviteId);

        if (!invite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        res.status(200).json({ message: 'Invite successfully deleted' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

module.exports = router;
