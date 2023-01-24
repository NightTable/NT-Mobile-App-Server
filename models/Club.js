// All information, source code contained in this document
// is the property of StrynDev Solutions, LLC. It must not
// be transmitted to others without the written consent of
// StrynDev Solutions. It must be returned to StrynDev Solutions
// when its authorized use is terminated.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: [Number],
  instaHandle: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  photos: [String],
  //photo vs photoId ???
  regionId: {
    type: Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  stripeAccountNumber: {
    type: String,
    required: true,
  },
  representativeId:{
      type: Schema.Types.ObjectId,
      ref: 'Representative',
    //   required: true
  },
  ownedBy: {
    type: String,
    // ref: 'owners',
    required: true,
  },
  lineItems: [
    {
      name: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
    },
  ],
});

clubSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Club", clubSchema);
