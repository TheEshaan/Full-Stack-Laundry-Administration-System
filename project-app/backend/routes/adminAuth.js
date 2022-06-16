const router = require("express").Router();
const Admin = require("../models/Admin");

router.post("/register", async (req, res) => {
    console.log(req.body);
    const newAdmin = new Admin({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,

    });
    console.log(newAdmin)
    try{
        const savedAdmin = await Admin.create(newAdmin);
        res.status(201).json(savedAdmin);
    } catch (err) {
        res.status(500).json(err);
    }
})
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });
        !admin && res.status(401).json("Wrong credentials!");
        admin.password !== req.body.password &&  res.status(401).json("Wrong credentials!");
        const { password, ...others } = admin._doc;
         return res.json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;