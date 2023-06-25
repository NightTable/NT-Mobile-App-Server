const express = require("express");
const Region = require("../models/Region");
const router = express.Router();
const Privileges = require("../models/Privileges");
const Representative = require("../models/Representative");
const Club = require("../models/Club");
const User = require("../models/User");

//need to know how we are creating the representative
router.post("/createRepresentative", async (req, res) => {
  try {
    //need to add a CONDITION where the representative already exists -- only a new club and its privileges are being added to it
    //we can add a middleware which will check if the rep exists - if exists we will redirect to the patch request
    let representativeCheck = await Representative.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    console.log(representativeCheck);
    if (representativeCheck) {
      return updateRespresentativeFunction(req, res);
    }
    let repObject = req.body;
    // let clubPrivilegesArray = repObject.clubPrivileges;
    // let clubPrivileges = [];
    // for (let club of clubPrivilegesArray) {
    //   let privileges = club.privileges;
    //   let privilegesDBInstance = await Privileges.create(privileges);
    //   club.privileges = privilegesDBInstance._id.toString();
    //   clubPrivileges.push(club);
    // }
    // req.body.clubPrivileges = clubPrivileges;
    // repObject = req.body;
    //creating the representative in the DB
    let representative = await Representative.create(repObject);
    if (!representative)
      return res.status(400).send({ status: false, message: "failed" });
    return res.status(201).send({
      status: true,
      message: "representative created",
      data: representative,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
});

//update representative
let updateRespresentativeFunction = async (req, res) => {
  try {
    let repObject = req.body;
    // let clubPrivilegesArray = repObject.clubPrivileges;
    // let clubPrivileges = [];
    // for (let club of clubPrivilegesArray) {
    //   let privileges = club.privileges;
    //   let privilegesDBInstance = await Privileges.create(privileges);
    //   club.privileges = privilegesDBInstance._id.toString();
    //   clubPrivileges.push(club);
    // }
    // req.body.clubPrivileges = clubPrivileges;
    // repObject = req.body;
    //updating the representative in the DB
    let representative = await Representative.findOneAndUpdate(
      { phoneNumber: repObject.phoneNumber, isDeleted: false },
      repObject,
      { new: true }
    );
    if (!representative)
      return res.status(400).send({ status: false, message: "failed" });
    return res.status(201).send({
      status: true,
      message: "representative created",
      data: representative,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};
router.put("/updateRepresentative", updateRespresentativeFunction);

//get representative details based on representative ID
router.get("/representative/:id", async (req, res) => {
  try {
    let representative = await Representative.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("associatedClubs");
    if (!representative)
      return res
        .status(200)
        .send({ status: false, message: "representative not found", data: [] });
    return res.status(200).send({
      status: true,
      message: "representative found",
      data: representative,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
});

//get all the representatives details based on representative ID
router.get("/representative", async (req, res) => {
  try {
    let representatives = await Representative.find({
      isDeleted: false,
    }).populate("clubPrivileges.club clubPrivileges.privileges");
    if (!representatives.length)
      return res
        .status(200)
        .send({ status: false, message: "representatives not found",data: [] });
    return res.status(200).send({
      status: true,
      message: "representatives found",
      data: representatives,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
});

//get representative on basis of clubId
router.get("/club/:clubId", async (req, res) => {
  try {
    let clubId = req.params.clubId;
    let representatives = await Representative.find({
      isDeleted: false,
      'clubPrivileges.club': clubId,
    }).populate('clubPrivileges.club clubPrivileges.privileges');
    if (!representatives.length)
      return res
        .status(200)
        .send({ status: false, message: "representatives not found", data: [] });
    return res.status(200).send({
      status: true,
      message: "representatives found",
      data: representatives,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
});

//delete a representativee based on id
router.delete("/representative/:id", async (req, res) => {
  try {
    let representative = await Representative.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!representative)
      return res
        .status(404)
        .send({ status: false, message: "representative not found" });
    return res
      .status(200)
      .send({ status: true, message: "representative deleted" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
});

module.exports = router;
