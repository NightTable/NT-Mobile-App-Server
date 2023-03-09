const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    location: [Number],
    instaHandle: {
      type: String,
      required: [true, "insta handle is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
      unique: [true, "phone number already exists!"],
    },
    Address: {
      Address: String,
      City: {
        type: String,
        required: [true, "city is required in address"],
      },
      State: String,
      Country: {
        type: String,
        required: [true, "country is required in address"],
      },
    },
    website: {
      type: String,
      required: false,
    },
    photos: [String],
    floorPlan: {
      type: String,
    },
    menu: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
    stripeAccountNumber: {
      type: String,
      required: [true, "stripe account number is required"],
      unique: true,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// clubSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Club", clubSchema);
