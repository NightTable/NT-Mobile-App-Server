const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableRequestParticipantMappingSchema = new Schema({
  tableReqId: {
    type: Schema.Types.ObjectId,
    ref: "TableRequest",
    required: true,
  },
  participantId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  minimumPrice: {
    type: Number,
    required: true,
  },
  isRequestOrganizer: {
    type: Boolean,
    requires: true,
  },
  isInvitedPending: {
    type: Boolean,
    required: true,
  },
  isActiveParticipant: {
    type: Boolean,
    required: true,
  },
  customPrice: {
    type: Number,
    required: true,
  },
  isCustomPriceRequested: {
    type: Boolean,
    required: true,
  },
  isCustomPriceGranted: {
    type: Boolean,
    required: true,
  },
  isCostContributionFinalized: {
    type: Boolean,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model("TableRequestParticipantMapping", tableRequestParticipantMappingSchema);
