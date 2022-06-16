const router = require("express").Router();
const Category = require("../models/Category");

//CREATE WASH CATEGORY
router.post("/", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await Category.create(newCategory);
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ALL WASH CATEGORY
router.get("/", async (req, res) => {
    try {
        const category = await Category.find();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//uPDATE ONE WASH CATEGORY
router.put("/", async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.body._id, { $set: req.body},{ new: true });
        res.status(201).json(updatedCategory)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
module.exports = router;