const express = require("express");
const Region = require("../models/Region");
const router = express.Router();
const Club = require("../models/Club");
// const User = require("../models/User");
// const { ObjectId } = require("mongodb");

router.post("/createClub", async (req, res) => {
  try {
    let clubData = req.body;
    //VALIDATION ADDED
    if (clubData.name.trim() == "") {
      return res
        .status(200)
        .send({ status: false, message: "Please add the club name!" });
    } else if (clubData.phoneNumber.trim() == "") {
      return res
        .status(200)
        .send({ status: false, message: "Please add phone number of club" });
    } else if (clubData.Address.State.trim() === 0) {
      return res
        .status(200)
        .send({ status: false, message: "Please add a state of the club." });
    } else if (clubData.Address.Country.trim() === 0) {
      return res
        .status(200)
        .send({ status: false, message: "Please add a country of the club ." });
    } else if (clubData.Address.Address.trim() === 0) {
      return res
        .status(200)
        .send({ status: false, message: "Please add a address of the club." });
    } else if (clubData.instaHandle.trim() == "") {
      return res
        .status(200)
        .send({ status: false, message: "Please add the instagram handler" });
    } else if (clubData.website.trim() == "") {
      return res.status(200).send({
        status: false,
        message: "Please add website link of the club !",
      });
    } else if (clubData.stripeAccountNumber.trim() == "") {
      return res
        .status(200)
        .send({ status: false, message: "Please add stripe Account Number !" });
    } else if (clubData.lineItems.length === 0) {
      return res
        .status(200)
        .send({ status: false, message: "Please add a line item." });
    } else {
      let createdClub = await Club.create(clubData);
      return res
        .status(201)
        .send({ status: true, message: "success", data: createdClub });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/club/:clubid", async (req, res) => {
  try {
    let club_id = req.params.clubid;
    let getClubDetails = await Club.findOne({ _id: club_id });
    if (!getClubDetails) {
      return res.status(200).send({
        status: false,
        message: "Club Details Not Found!",
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Club Details Found!",
        data: getClubDetails,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.put("/club/:clubid", async (req, res) => {
  try {
    let clubId = req.params.clubid;
    let updateDetails = req.body;

    let updatedClub = await Club.findOneAndUpdate(
      { _id: clubId, isDeleted: false },
      updateDetails,
      { new: true }
    );
    if (!updatedClub)
      return res
        .status(404)
        .send({ status: false, message: "club not found!" });
    return res
      .status(201)
      .send({ status: true, message: "club updated", data: updatedClub });
  } catch (error) {
    res.status(500).send({ message: error.message });
    return;
  }
});

router.delete("/club/:clubid", async (req, res) => {
  try {
    let clubId = req.params.clubid;
    let updatedClub = await Club.findOneAndUpdate(
      { _id: clubId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!updatedClub)
      return res
        .status(404)
        .send({ status: false, message: "club not found!" });
    return res
      .status(200)
      .send({ status: true, message: "deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

// router.post("/user/:userid", async (req, res) => {
//   const userId = req.params.userid;

//   let name = null;
//   let latitudeParam = null;
//   let longitudeParam = null;
//   let instaHandleParam = null;
//   let phoneNumberParam = null;
//   let addressParam = null;
//   let websiteParam = null;
//   let regionIdParam = null;
//   let representativeIdParam = null;
//   let stripeAccountNumberParam = null;

//   try {
//     name = req.body.name;
//     latitudeParam = parseFloat(req.body.latitude);
//     longitudeParam = parseFloat(req.body.longitude);
//     instaHandleParam = req.body.instaHandle;
//     phoneNumberParam = parseInt(req.body.phoneNumber);
//     addressParam = req.body.address;
//     websiteParam = req.body.website;
//     regionIdParam = req.body.regionId;
//     representativeIdParam = req.body.representativeId;
//     stripeAccountNumberParam = req.body.stripeAccountNumber;

//     // checkig the case if the user does not put in all the required parameters

//     const allInputsPresent =
//       name !== undefined &&
//       latitudeParam !== undefined &&
//       longitudeParam !== undefined &&
//       instaHandleParam !== undefined &&
//       phoneNumberParam !== undefined &&
//       addressParam !== undefined &&
//       websiteParam !== undefined &&
//       regionIdParam !== undefined &&
//       representativeIdParam !== undefined &&
//       stripeAccountNumberParam !== undefined;

//     if (!allInputsPresent) {
//       res.status(400).send({
//         message:
//           "Invalid request -- The club was not able to be added to the database",
//       });
//       return;
//     } else {
//       // there probably should be a validation check to make sure that the latitude and longitude
//       // of the club are indeed within the range constraints/location of the region but that can wait until a little later
//       // in development most likely

//       // this endpoint is used on the web admin panel, so maybe we wnant to do that in browser, we can decide on this later

//       // verifying that the user is of manager role

//       const userObject = await User.findById(new ObjectId(userId));

//       const newClubObject = await Club.create({
//         name: name,
//         latitude: latitudeParam,
//         longitude: longitudeParam,
//         instaHandle: instaHandleParam,
//         phoneNumber: phoneNumberParam,
//         address: addressParam,
//         website: websiteParam,
//         regionId: new ObjectId(regionIdParam),
//         representativeId: new ObjectId(representativeIdParam),
//         stripeAccountNumber: stripeAccountNumberParam,
//       });

//       await newClubObject.save();

//       res.json({
//         message: "The club was successfully added to the database",
//       });
//       return;
//     }
//   } catch (exception) {
//     res.status(400).send({
//       message:
//         "Invalid request -- The club was not able to be added to the database",
//     });
//     return;
//   }
// });

router.get("/clubs", async (req, res) => {
  try {
    let filter = req.body;
    filter.isDeleted = false; //added validation that only not deleted clubs are returned
    let clubs = await Club.find(filter).lean();
    if (!clubs.length) {
      return res
        .status(200)
        .send({ status: true, message: "NO Clubs Found!", data: [] });
    }
    return res
      .status(200)
      .send({ status: true, message: "success", data: clubs });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/:clubid", async (req, res) => {
  try {
    let clubId = req.params.clubid;
    let retrievedClubObject = await Club.findOne({
      _id: clubId,
      isDeleted: false,
    }).populate("menu");
    if (!retrievedClubObject) {
      return res.status(404).send({ status: false, message: "no club found." });
    }
    return res
      .status(200)
      .send({ status: true, message: "success", data: retrievedClubObject });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/coordinates/:lat/:long", async (req, res) => {
  try {
    let clientLatitude = parseFloat(req.params.lat);
    let clientLongitude = parseFloat(req.params.long);

    let closeByClubs = await Club.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [clientLatitude, clientLongitude],
          },
          distanceField: "distance.calculated",
          maxDistance: 50000,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "regions",
          localField: "regionId",
          foreignField: "_id",
          as: "regionDetails",
        },
      },
    ]);
    if (!closeByClubs.length) {
      return res.status(400).send({ status: false, message: "no club found" });
    }
    return res.status(200).send({ status: true, data: closeByClubs });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
