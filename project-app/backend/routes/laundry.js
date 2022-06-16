const router = require("express").Router();
const Laundry = require("../models/Laundry");
const User = require("../models/User");
const Category = require("../models/Category");

//CREATE LAUNDRY ORDER
router.post("/", async (req, res) => {
    try {
        const category = await Category.findOne({ category: req.body.category });
        const pricePerKg = category.cost;
        const itemArray = req.body.items;
        const billing = { cost: 0 };
        itemArray.forEach(element => {
            billing.cost += pricePerKg * element.quantity;
        });
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json("User not found")
        }
        req.body.customer = user._id;
        const newLaundry = new Laundry({ ...req.body, ...billing });
        try {
            const savedLaundry = await Laundry.create(newLaundry);
            try {
                await savedLaundry.populate("customer");
                res.status(200).json(savedLaundry);
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    } 
});
//UPDATE LAUNDRY ORDER
router.put("/update/:id", async (req, res) => {
    if (req.body._id === req.params.id) {

        try {
            const category = await Category.findOne({ category: req.body.category });
            const pricePerKg = category.cost;
            const itemArray = req.body.items;
            let billing = 0;
            itemArray.forEach(element => {
                billing += pricePerKg * element.quantity;
            });
            req.body.cost = billing;
            
            const updatedLaundry = await Laundry.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedLaundry);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("You can update only your account!");
    }
})
// DELETE ORDER
router.delete("/delete/:id", async (req, res) => {
    
        try {
            await Laundry.findByIdAndDelete(req.params.id);
            res.status(200).json("Laundry Order has been deleted....");
        } catch (error) {
            res.status(500).json(err);
        }
    
});
// GET BY ID
router.get("/find/:id", async (req, res) => {
    try {
        const laundry = await Laundry.findById(req.params.id);
        res.status(200).json(laundry);

    } catch (error) {
        res.json(500).json(error);
    }
});
//GET LAUNDRIES OF A USER
router.get("/user/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        let userLaundry;
        if (user)  userLaundry = await Laundry.find({ customer: user._id })
        else userLaundry = [];
        res.status(200).json(userLaundry);
    } catch (error) {
        res.json(500).json(error);
    }
});
//GET ALL ORDERS
router.get("/", async (req, res) => {
    try {
        const allLaundry = await Laundry.find().populate("customer");
        res.status(201).json(allLaundry);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/recent", async (req, res) => {
    try {
        const laundry = await Laundry.find().populate("customer");
        laundry.sort(function (laundry1, laundry2) { return laundry2.createdAt - laundry1.createdAt });
        laundry.length = Math.min(laundry.length, 5);
        res.status(200).json(laundry);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/users/status", async (req, res) => {
    try {
        const pendingUsers = await Laundry.aggregate([
            {
                $match: { "status": "Pending" }
            },
            {
                $group: {
                    _id: "$customer",
                    amount:{$sum:"$cost"}
                },
            },
        ]);
        try {
            const recievedUsers = await Laundry.aggregate([
                {
                    $match: { "status": "Recieved" }
                },
                {
                    $group: {
                        _id: "$customer",
                        amount:{$sum:"$cost"}
                    },
                },
            ]);
             const users = { recievedUsers, pendingUsers };
                res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err);
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
})
//GET ALL ORDERS TODAY
// router.get("/today", async (req, res) => {
    
//     var firstDate = new Date();
//     firstDate.setDate(firstDate.getDate() - 1);
//     var secondDate = new Date();
//     // console.log(firstDate,secondDate)
//     console.log(new Date().toISOString())
//     console.log(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDay()).toISOString(),new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDay()+1).toISOString())
//     try {
//         const allLaundry = await Laundry.find(
//             {
//                 createdAt: {
//                     $gte: new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDay()).toISOString(),
//                     $lte: new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDay()+1).toISOString()
//                 }
//             });
//         res.status(201).json(allLaundry);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });





module.exports = router;