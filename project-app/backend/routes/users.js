const router = require("express").Router();
const Laundry = require("../models/Laundry");
const User = require("../models/User");

//ADD USER
router.post("/", async (req, res) => {
    
    try {
        const newUser = new User(req.body);
        const savedUser = await User.create(newUser);
        res.status(201).json(savedUser);
    } catch (err) {
         res.status(500).json(err);
    }
});

//UPDATE
router.put("/edit/:id", async (req, res) => {
    try {
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,  
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) { 
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
 
    
        try {
            await Laundry.deleteMany({ customer: req.params.id });
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted....");
        } catch (error) {
           res.status(500).json(err);
          }
     
   
});
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.json(500).json(error);
    }
});
router.get("/findById/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.json(500).json(error);
    }
})
//GET USER
router.get("/find/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).json(user);
    } catch (error) {
        res.json(500).json(error);
    }
});
//GET RECENT CUSTOMERS
router.get("/recent", async (req, res) => {
   try {
       const users = await User.find();
       users.sort(function (user1, user2) { return user2.createdAt - user1.createdAt });
       users.length = Math.min(users.length, 6);
       res.status(200).json(users);
   } catch (err) {
       res.status(500).json(err);
   } 
});
//GET TOTAL CUSTOMERS TODAY
router.get("/stats/today", async (req, res) => {
    try {
        const users = await User.aggregate([
            {
              $group: {
                    createdAt: { $eq: date },
                    count: { $sum: 1 }
                }
            },
        ]);
        console.log(users)
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
    
});
//GET NEW USERS PER MONTH
router.get("/perMonth", async (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    try {
        const newUsers = await User.aggregate([
        {
            '$match': {
                'createdAt': {
                       $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) 
                   
                }
            }
        },
        {
            '$project': {
                'month': {
                    '$month': '$createdAt'
                },
            }
        }, {
            '$group': {
                '_id': '$month',
                'total': {
                    '$sum': 1
                },
                'month': {
                    '$first': '$month'
                },
            }
        }
    ]);
    const resArr = [
    {
        name: "Jan",
        "Active User": 0,
    },
    {
        name: "Feb",
        "Active User": 0,
    },
    {
        name: "Mar",
        "Active User": 0,
    },
    {
        name: "Apr",
        "Active User": 0,
    },
    {
        name: "May",
        "Active User": 0,
    },
    {
        name: "Jun",
        "Active User": 0,
    },
    {
        name: "Jul",
        "Active User": 0,
    },
    {
        name: "Aug",
        "Active User": 0,
    },
    {
        name: "Sep",
        "Active User": 0,
    },
    {
        name: "Oct",
        "Active User": 0,
    },
    {
        name: "Nov",
        "Active User": 0,
    },
        {
            name: "Dec", 
            "Active User": 0,
        },
    
        ];
        for (let i = 0; i < newUsers.length; i++){
            resArr[newUsers[i].month]["Active User"] = newUsers[i].total;
        }
        res.status(200).json(resArr)
    } catch (err) {
        console.log(err)
    }
    
})

module.exports = router;