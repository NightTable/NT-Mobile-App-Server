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
    required: [true, "name is required"],
    
  },
  location: [Number],
  instaHandle: {
    type: String,
    required: [true, "insta handle is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "phone number already exists!"]
  },
  address: {
    line1: String,
    City: {
      type: String,
      required: [true, "city is required in address"],
    },
    state: String,
    country: {
      type: String,
      required: [true, "country is required in address"],
    },
  },
  website: {
    type: String,
    required: false,
  },
  photos: [String],
  stripeAccountNumber: {
    type: String,
    required: [true, "stripe account number is required"],
  },
  representativeId: {
    type: Schema.Types.ObjectId,
    ref: "Representative",
    //   required: true
  },
  ownedBy: {
    type: String,
    // ref: 'owners',
    required: [true, "owned by is required"],
  },
  lineItems: [
    {
      name: {
        type: String,
        required: [true, "name of lineItem is required"],
      },
      percentage: {
        type: Number,
        required: [true, "percentage for the lineItem is required"],
      },
    },
  ],
});

// clubSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Club", clubSchema);
