const express = require("express");
const router = express.Router();
const menu = require("../models/Menu");

router.post("/createMenu", async (req, res) => {
  try {
    let menuData = req.body;
    let menuInstance = await menu.create(menuData);
    return res.status(201).send({
      status: true,
      message: "created successfully",
      data: menuInstance,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/:menuId", async (req, res) => {
  try {
    let { menuId } = req.params;
    let menuFromDb = await menu.findOne({ _id: menuId, isDeleted: false }).select({_id:0, menu:1})//.populate('clubId').lean();;
    if (!menuFromDb)
      return res.status(404).send({ status: false, message: "menu not found" });
    return res
      .status(200)
      .send({ status: true, message: "menu found", data: menuFromDb.menu });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.get("/club/:clubId", async (req, res) => {
  try {
    let { clubId } = req.params;
    let menuForClub = await menu.findOne({ clubId: clubId, isDeleted: false }).select({_id:0, menu:1})//.populate('clubId').lean();
    if (!menuForClub)
      return res.status(404).send({ status: false, message: "menu not found" });
    return res
      .status(200)
      .send({ status: true, message: "menu found", data: menuForClub.menu });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.put("/:menuId", async (req, res) => {
  try {
    let { menuId } = req.params;
    let updatedMenu = req.body;
    let menuAfterUpdation = await menu.findOneAndUpdate(
      { _id: menuId, isDeleted: false },
      updatedMenu,
      { new: true }
    );
    if (!menuAfterUpdation)
      return res.status(404).send({ status: false, message: "menu not found" });
    return res.status(200).send({
      status: true,
      message: "updated successfully",
      data: menuAfterUpdation,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.delete("/:menuId", async (req, res) => {
  try {
    let { menuId } = req.params;
    let menuDeleted = await menu.findOneAndUpdate(
      { _id: menuId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!menuDeleted)
      return res.status(404).send({ status: false, message: "menu not found" });
    return res
      .status(200)
      .send({ status: true, message: "deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
