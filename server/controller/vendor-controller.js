const Vendor = require('../models/vendor-model.js');
const Food=require('../models/food-model.js')

// --------------------------Register the Shop -------------------------------//
const addVendor = async (req, res) => {
    try {
        const { img, coverImg, name, shopname, location, address, description,menuid, menudata, contact,openingHour,closingHour } = req.body;

        const vendorExist = await Vendor.findOne({ contact });

        if (vendorExist) {
            return res.status(400).json({ msg: "Vendor already exists" });
        }

        const newVendor = await Vendor.create({ img, coverImg, name, shopname, address,menuid, location, description, menudata, contact,openingHour,closingHour });

        res.status(200).json({ msg: "Vendor created successfully", vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// Add the menu in the Food Model -------------------//
// const addMenu = async(req,res)=>{
//     try {
//         const {img,coverImg,name,description,category,price,ingredients,rating,location} = req.body;
//         const newFood =  await Food.create({img,coverImg,name,description,category,price,ingredients,rating,location});
//         res.status(200).json({msg:"Menu created successfully",newFood});
//     } catch (error) {
//         res.status(404).json({msg:"Menu Error",error});  
//     }
// }

// }
// // Deelete the menu if not login in-----------------------------------//
// const deleteMenu = async (req, res) => {
//     try {
//         const deleteFood = await Food.deleteOne(
//             { name: req.body.name }
//         );
//         res.json({ deleteFood });
//     } catch (error) {
//         res.status(402).send("Error");
//     }

// // ----------------------------------- Push the Food Id in menu array in vendor model --------------------------//
// const pushMenuId  = async (req, res) => {
//     try {
//         const pushmenuId = await Vendor.findOneAndUpdate(
//             { contact: req.body.contact },
//             {
//                 menuid: req.body.menuid,
//             },
//             { new: true }
//         );
//         console.log(pushmenuId);
//         res.json(pushmenuId);
//     } catch (error) {
//         console.log(error);
//         res.status(402).send("Error");
//     }
// }

// --------------------------------- ********deleteSelectedVendor********* ----------------------------- //

const deleteSelectedVendor = async (req, res) => {
    const deleteVendor = await Vendor.deleteOne(
        { contact: req.body.contact }
    );
    res.json({ deleteVendor });
};

// --------------------------------- ********updateSelectedVendor********* ----------------------------- //

const updateSelectedVendor = async (req, res) => {
    try {
        const updatedResult = await Vendor.findOneAndUpdate(
            { contact: req.body.contact },
            {
                img: req.body.img,
                coverImg: req.body.coverImg,
                name: req.body.name,
                shopname: req.body.shopname,
                address: req.body.address,
                openingHour: req.body.openingHour,
                closingHour: req.body.closingHour,
                menudata: req.body.menudata,
                ratings: req.body.ratings,
            },
            { new: true }
        );
        console.log(updatedResult);
        res.json(updatedResult);
    } catch (error) {
        console.log(error);
        res.status(402).send("Error");
    }
};

// --------------------------------- ********getAllVendors********* ----------------------------- //

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        console.log(vendors);

        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ msg: "No vendors found" });
        }
        res.status(200).json(vendors);
    } catch (error) {
        next(error);
    }
};

// -------------------------------------- ******Get vendor by foods *********** -----------------------------//

// const getVendorsByFood = async (req, res) => {

//     try {
//         const foodItem = req.body.foodItem;

//         // Search vendors by food item using the text index
//         const vendors = await Vendor.find({ $text: { $search: foodItem } }, { _id: 0, name: 1, shopname: 1, location: 1 });
//         const vendorName = vendors.name;


//         if (!vendors.length) {
//             return res.status(404).json({ message: 'No vendors found for the searched food item' });
//         }

//         const simplifiedVendors = [];

//         // Iterate over each vendor and extract the required fields
//         vendors.forEach(vendor => {
//             const simplifiedVendor = {
//                 name: vendor.name,
//                 shopname: vendor.shopname,
//                 location: vendor.location // Include location coordinates
//             };
//             simplifiedVendors.push(simplifiedVendor);
//         });

//         res.json(simplifiedVendors);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

const getVendorsByFood = async (req, res) => {
    try {
        const foodItem = req.body.foodItem;

        // Search vendors by food item using the nested array and project only required fields
        const vendors = await Vendor.find(
            { "menudata.name": foodItem },
            { _id: 0, name: 1, shopname: 1, "location.coordinates": 1 }
        );

        if (!vendors.length) {
            return res.status(404).json({ message: 'No vendors found for the searched food item' });
        }

        const simplifiedVendors = vendors.map(vendor => ({
            name: vendor.name,
            shopname: vendor.shopname,
            location: vendor.location.coordinates // Include location coordinates
        }));
        console.log(simplifiedVendors);

        res.json(simplifiedVendors);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};




// const getVendorsByFood = async(req,res) =>{
//     try {
//         const { foodName } = req.params;

//         // Perform case-insensitive search
//         const regex = new RegExp(foodName, 'i');

//         // Search for vendors whose menu contains the specified food name
//         const vendors = await Vendor.aggregate([
//             {
//                 $match: {
//                     "menudata.name": { $regex: regex }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     name: 1,
//                     location: 1
//                 }
//             }
//         ]);

//         // If no vendors found, respond with 404 status code
//         if (vendors.length === 0) {
//             return res.status(404).json({ msg: "No vendors found for the given food name" });
//         }

//         res.status(200).json({ vendors });
//     } catch (error) {
//         // If an error occurs, respond with 500 status code and error message
//         console.error(error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

// ********************************** Randomly get the food from the database ********************************//

const getRandomFood = async (req, res) => {
    try {
        // Use aggregation pipeline to randomly select menudata items
        const menuItems = await Vendor.aggregate([
            { $unwind: '$menudata' },
            { $sample: { size: 5 } }, 
            { $project: { _id: 0, menudata: 1 } }
        ]);

        // If no menu items found, return a 404 Not Found response
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found' });
        }

        // Extract the menu items from the aggregation result and return as JSON response
        res.json(menuItems.map(item => item.menudata));
    } catch (error) {
        // Handle errors
        console.error('Error fetching random menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = { addVendor, deleteSelectedVendor, updateSelectedVendor, getVendorsByFood, getRandomFood ,getAllVendors};
