const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const representativeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is unique"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
      unique: [true, "phone Number is unique"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username is unique"],
    },
    role: {
      type: String,
      required: true,
      enum: ["staff", "management", "host", "promoter", "godfather"],
    },
    associatedClubs: [{ type: Schema.Types.ObjectId, ref: "Club" }],
    // clubPrivileges:[{
    //     club:{
    //         type: Schema.Types.ObjectId,
    //         ref: 'Club',
    //     },
    //     privileges:{
    //         type: Schema.Types.ObjectId,
    //         ref: 'Privilege',
    //     }
    // }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Representative", representativeSchema);

// populate the schema using following example
// SchemaC.findOne().populate('references.reference1 references.reference2').exec(function (err, schemaC) {
//     console.log(schemaC.references.reference1.name);
//     console.log(schemaC.references.reference2.name);
//   });
