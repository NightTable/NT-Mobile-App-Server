const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    clubId: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    menuCatgeory: {
      category: String,
      items: [
        {
          name: {
            type: String,
            required: [true, "name of item is required"],
          },
          price: {
            type: Number,
            required: [true, "price of item is required"],
          },
          quantity: {
            type: Number,
            required: [true, "quantity of item is required"],
          },
        },
      ],
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
