const express = require("express");
const router = express.Router();
const Laundry = require("../models/Laundry");


//GET TOTAL PROFIT 
router.get("/profit/total", async (req, res) => {
    try {
        const profit = await Laundry.aggregate([
            {
              $group: {
                    _id: null,
                    amount: { $sum: "$cost" }
                }
            },
        ]);
        res.status(201).json(profit[0]);
    } catch (err) {
        res.status(500).json(err)
    }
    
});

//GET PROFIT FOR YEAR
router.get("/profit/year", async (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    try {
        const revenue = await Laundry.aggregate([
            {
                $match: { "createdAt": { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) } }
            },

            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$cost" },
                }
            },
        ]);
        try {
            const lastRevenue = await Laundry.aggregate([
                {
                    $match: { "createdAt": { $gte: new Date(`${year - 1}-01-01`), $lt: new Date(`${year}-01-01`) } }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: "$cost" },
                    }
                },
            ]);
            const netRevenue = { revenue, lastRevenue };
            if (netRevenue.lastRevenue.length === 0) {
                netRevenue.lastRevenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            if (netRevenue.revenue.length === 0) {
                netRevenue.revenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            res.status(200).json(netRevenue)
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
});

//GET PROFIT FOR MONTH
router.get("/profit/month", async (req, res) => {
    const date = new Date();
    const year = date.getFullYear(), month = date.getMonth() + 1;
    try {
        const revenue = await Laundry.aggregate([
            {
                $match: { "createdAt": { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month + 1}-01`) } }
            },

            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$cost" },
                }
            },
        ]);
        try {
            const lastRevenue = await Laundry.aggregate([
                {
                    $match: { "createdAt": { $gte: new Date(`${year}-${month - 1}-01`), $lt: new Date(`${year}-${month}-01`) } }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: "$cost" },
                    }
                },
            ]);
            const netRevenue = { revenue, lastRevenue };
            if (netRevenue.lastRevenue.length === 0) {
                netRevenue.lastRevenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            if (netRevenue.revenue.length === 0) {
                netRevenue.revenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            res.status(200).json(netRevenue)
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
});
//GET PROFIT FOR DAY
router.get("/profit/day", async (req, res) => {
    const date = new Date();
     const year = date.getFullYear(), month = date.getMonth() + 1, dt = date.getDate()
    try {
        const revenue = await Laundry.aggregate([
            {
                $match: { "createdAt": { $gte: new Date(`${year}-${month}-${dt}`), $lt: new Date(`${year}-${month}-${dt+1}`) } }
            },

            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$cost" },
                }
            },
        ]);
        try {
            const lastRevenue = await Laundry.aggregate([
                {
                    $match: { "createdAt": { $gte: new Date(`${year}-${month}-${dt-1}`), $lt: new Date(`${year}-${month}-${dt}`) } }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: "$cost" },
                    }
                },
            ]);
            const netRevenue = { revenue, lastRevenue };
            if (netRevenue.lastRevenue.length === 0) {
                netRevenue.lastRevenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            if (netRevenue.revenue.length === 0) {
                netRevenue.revenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            res.status(200).json(netRevenue)
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
});

//GET PROFIT FOR WEEK
router.get("/profit/week", async (req, res) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.floor(days / 7);
    try {
        const revenue = await Laundry.aggregate([
            {
                $match: { "createdAt": { $gte: func("$createdAt", weekNumber), $lt: func("$createdAt", weekNumber + 1) } }
            },

            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$cost" },
                }
            },
        ]);
        try {
            const lastRevenue = await Laundry.aggregate([
                {
                    $match: { "createdAt": { $gte: func("$createdAt", weekNumber - 1), $lt: func("$createdAt", weekNumber) } }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: "$cost" },
                    }
                },
            ]);
            const netRevenue = { revenue, lastRevenue };
            if (netRevenue.lastRevenue.length === 0) {
                netRevenue.lastRevenue[0] = {
                    "_id": null,
                    "totalSaleAmount": 0
                }
            }
            console.log(lastRevenue)
            res.status(200).json(netRevenue)
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/profit/category", async (req, res) => {
    try {
        const categoryProfit = await Laundry.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalSaleAmount: { $sum: "$cost" },
                    Revenue: {$sum: "$cost"},
                    count: { $sum: 1 }
                }
            },
        ]);
        res.status(200).json(categoryProfit)
    } catch (error) {
        
    }
});


module.exports = router;
// on user details change (like deletion of user or update of user details) corresponding changes should be seen in laundry aswell