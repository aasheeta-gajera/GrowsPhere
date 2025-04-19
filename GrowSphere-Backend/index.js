// const express = require("express")
// const fs = require("fs")
// const cors = require('cors')
// const mongoose = require('mongoose');
// const app = express()
// const PORT = 5000
// app.use(express.json())
// app.use(cors());
// // app.use(cors({ origin: 'http://localhost:3000' }));
// const Farmer = require("./farmer.js");
// const path = require('path');

// //DATABASE NAME : CRUDFARMER
// //USERNAME : farmerdatainmongoose
// //PASSWORD : XHcUr5Fu2UEqi5Pk

// mongoose.connect("mongodb://localhost:27017/growphereFarmer", {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000, // Set a higher timeout if needed
// })
//   .then(() => console.log('MongoDB connected successfully!'))
//   .catch((error) => console.error('MongoDB connection failed:', error.message));

//   app.route("/farmers")
//     .get(async (req, res, next) => {  
//       try {
//         const farmers = await Farmer.find(); // Fetch all farmers from the database
//         res.json({ status: "success", data: farmers });
//       } catch (err) {
//         next(err);
//       }
//     })
//   .post(async (req, res, next) => {
//     try {
//       const { name, contact, photoBase64, farmLocation } = req.body;

//       // Validate required fields
//       if (!name || !contact?.phone || !contact?.email || !farmLocation) {
//         return res.status(400).json({
//           status: "error",
//           message: "Missing required fields: name, phone, email, or farmLocation.",
//         });
//       }

//       if (!photoBase64) {
//         return res.status(400).json({
//           status: "error",
//           message: "Photo (Base64) is required.",
//         });
//       }

//       // Decode and save the photo
//       const photoBuffer = Buffer.from(photoBase64, "base64");
//       const photoPath = `uploads/farmers/${Date.now()}-photo.png`;
//       require("fs").writeFileSync(photoPath, photoBuffer);

//       // Generate farmerId dynamically and check if it exists
//       let newFarmerId = await Farmer.countDocuments() + 1;
//       let farmerExists = await Farmer.exists({ farmerId: newFarmerId });
//       while (farmerExists) {
//         newFarmerId++;
//         farmerExists = await Farmer.exists({ farmerId: newFarmerId });
//       }

//       // Create a new Farmer document
//       const newFarmer = new Farmer({
//         name,
//         contact,
//         farmLocation,
//         farmerId: newFarmerId,
//         photo: photoPath, // Save the photo path
//         producedCrops: [], // Initialize with an empty array
//       });

//       // Save the farmer to the database
//       const savedFarmer = await newFarmer.save();

//       res.json({ status: "success", data: savedFarmer });
//     } catch (err) {
//       next(err);
//     }
//   });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.route("/farmers/:farmerId")
//   .get(async (req, res, next) => {
//     try {
//       const farmerId = req.params.farmerId; // Extract farmerId from the URL
//       const farmer = await Farmer.findOne({ farmerId: farmerId }); // Find the farmer by farmerId

//       if (!farmer) {
//         return res.status(404).json({
//           status: "error",
//           message: `Farmer with ID ${farmerId} does not exist`,
//         });
//       }

//       return res.json({
//         status: "success",
//         data: farmer,
//       });
//     } catch (err) {
//       next(err); // Pass error to the next middleware (error handler)
//     }
//   })

//   // Route to delete a farmer by ID
//   .delete(async (req, res, next) => {
//     try {
//       const farmerId = req.params.farmerId; // Extract farmerId from the URL

//       // Delete the farmer by farmerId
//       const result = await Farmer.deleteOne({ farmerId: farmerId });

//       if (result.deletedCount === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: `Farmer with ID ${farmerId} not found`,
//         });
//       }

//       return res.json({
//         status: "success",
//         message: `Farmer with ID ${farmerId} and their crops have been deleted`,
//       });
//     } catch (err) {
//       next(err); // Pass error to the next middleware (error handler)
//     }
//   });


// // app.route('/farmers/:farmerId/crops').post(async (req, res, next) => {
// //   try {
// //     const farmerId = req.params.farmerId; // Get farmerId from URL
// //     const body = req.body;

// //     // Validate if the farmer exists
// //     const farmer = await Farmer.findOne({ farmerId: farmerId });
// //     if (!farmer) {
// //       return res.status(404).json({
// //         status: 'error',
// //         message: `Farmer with ID ${farmerId} not found`,
// //       });
// //     }

// //     // Destructure the body and check for required fields
// //     const { cropName, quantity, pricePerUnit, category } = body;
// //     if (!cropName || !quantity || !pricePerUnit || !category) {
// //       return res.status(400).json({
// //         status: 'error',
// //         message: 'Missing required fields: cropName, quantity, pricePerUnit, and category.',
// //       });
// //     }

// //     // Validate category
// //     const validCategories = ['Grains', 'Vegetables', 'Fruits'];
// //     if (!validCategories.includes(category)) {
// //       return res.status(400).json({
// //         status: 'error',
// //         message: `Invalid category. Valid categories are: ${validCategories.join(', ')}.`,
// //       });
// //     }

// //     // Create new crop object
// //     const newCrop = {
// //       cropId: farmer.producedCrops.length + 1, // Auto-generate cropId based on current length
// //       cropName,
// //       quantity,
// //       pricePerUnit,
// //       category,
// //     };

// //     // Push the new crop to the farmer's producedCrops array
// //     farmer.producedCrops.push(newCrop);

// //     // Save the updated farmer document to the database
// //     await farmer.save();

// //     return res.json({
// //       status: 'success',
// //       message: 'Crop added successfully',
// //       farmer,
// //     });
// //   } catch (err) {
// //     next(err); // Pass any errors to the next middleware (error handler)
// //   }
// // });

// app.route('/farmers/:farmerId/crops').post(async (req, res, next) => {
//   try {
//     const farmerId = req.params.farmerId; // Get farmerId from URL
//     const body = req.body;

//     // Validate if the farmer exists
//     const farmer = await Farmer.findOne({ farmerId: farmerId });
//     if (!farmer) {
//       return res.status(404).json({
//         status: 'error',
//         message: `Farmer with ID ${farmerId} not found`,
//       });
//     }

//     // Destructure the body and check for required fields
//     const { cropName, quantity, pricePerUnit, category, photoBase64 } = body;
//     if (!cropName || !quantity || !pricePerUnit || !category || !photoBase64) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Missing required fields: cropName, quantity, pricePerUnit, category, and photoBase64.',
//       });
//     }

//     // Validate category
//     const validCategories = ['Grains', 'Vegetables', 'Fruits'];
//     if (!validCategories.includes(category)) {
//       return res.status(400).json({
//         status: 'error',
//         message: `Invalid category. Valid categories are: ${validCategories.join(', ')}.`,
//       });
//     }

//     // Decode and save the crop photo
//     const photoBuffer = Buffer.from(photoBase64, 'base64');
//     const photoPath = `uploads/crops/${Date.now()}-crop.png`;
//     require('fs').writeFileSync(photoPath, photoBuffer);

//     // Create new crop object
//     const newCrop = {
//       cropId: farmer.producedCrops.length + 1, // Auto-generate cropId based on current length
//       cropName,
//       quantity,
//       pricePerUnit,
//       category,
//       photo: photoPath, // Save the photo path
//     };

//     // Push the new crop to the farmer's producedCrops array
//     farmer.producedCrops.push(newCrop);

//     // Save the updated farmer document to the database
//     await farmer.save();

//     return res.json({
//       status: 'success',
//       message: 'Crop added successfully',
//       farmer,
//     });
//   } catch (err) {
//     next(err); // Pass any errors to the next middleware (error handler)
//   }
// });

// app.delete('/farmers/:farmerId/crops/:cropId', async (req, res, next) => {
//   try {
//     const { farmerId, cropId } = req.params;

//     // Find the farmer by ID
//     const farmer = await Farmer.findOne({ farmerId: parseInt(farmerId, 10) });

//     if (!farmer) {
//       return res.status(404).json({
//         status: 'error',
//         message: `Farmer with ID ${farmerId} not found`,
//       });
//     }

//     // Find the index of the crop to be deleted
//     const cropIndex = farmer.producedCrops.findIndex(
//       (crop) => crop.cropId === parseInt(cropId, 10)
//     );

//     if (cropIndex === -1) {
//       return res.status(404).json({
//         status: 'error',
//         message: `Crop with ID ${cropId} not found for this farmer`,
//       });
//     }

//     // Remove the crop from the producedCrops array
//     farmer.producedCrops.splice(cropIndex, 1);

//     // Save the updated farmer record to the database
//     await farmer.save();

//     // Respond with a success message
//     return res.json({
//       status: 'success',
//       message: `Crop with ID ${cropId} removed from farmer with ID ${farmerId}`,
//     });
//   } catch (err) {
//     next(err);
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })














import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Farmer from "./farmer.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = 5000
// app.use(express.json())

app.use(express.json({ limit: "10mb" })); // Adjust size as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// app.use(cors({ origin: 'http://localhost:3000' }));

//DATABASE NAME : CRUDFARMER
//USERNAME : farmerdatainmongoose
//PASSWORD : XHcUr5Fu2UEqi5Pk

mongoose.connect("mongodb://localhost:27017/growphereFarmer", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Set a higher timeout if needed
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

  app.route("/farmers")
    .get(async (req, res, next) => {  
      try {
        const farmers = await Farmer.find(); // Fetch all farmers from the database
        res.status(200).json({ status: "success", data: farmers });

      } catch (err) {
        next(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    })
  .post(async (req, res, next) => {
    try {
      const { name, contact, photoBase64, farmLocation } = req.body;

      // Validate required fields
      if (!name || !contact?.phone || !contact?.email || !farmLocation) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields: name, phone, email, or farmLocation.",
        });
      }

      if (!photoBase64) {
        return res.status(400).json({
          status: "error",
          message: "Photo (Base64) is required.",
        });
      }

      // Decode and save the photo
      const photoBuffer = Buffer.from(photoBase64, "base64");
      const photoPath = `uploads/farmers/${Date.now()}-photo.png`;
      require("fs").writeFileSync(photoPath, photoBuffer);

      // Generate farmerId dynamically and check if it exists
      let newFarmerId = await Farmer.countDocuments() + 1;
      let farmerExists = await Farmer.exists({ farmerId: newFarmerId });
      while (farmerExists) {
        newFarmerId++;
        farmerExists = await Farmer.exists({ farmerId: newFarmerId });
      }

      // Create a new Farmer document
      const newFarmer = new Farmer({
        name,
        contact,
        farmLocation,
        farmerId: newFarmerId,
        photo: photoPath, // Save the photo path
        producedCrops: [], // Initialize with an empty array
      });

      // Save the farmer to the database
      const savedFarmer = await newFarmer.save();

      res.json({ status: "success", data: savedFarmer });
    } catch (err) {
      next(err);
    }
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.route("/farmers/:farmerId")
  .get(async (req, res, next) => {
    try {
      const farmerId = req.params.farmerId; // Extract farmerId from the URL
      const farmer = await Farmer.findOne({ farmerId: farmerId }); // Find the farmer by farmerId

      if (!farmer) {
        return res.status(404).json({
          status: "error",
          message: `Farmer with ID ${farmerId} does not exist`,
        });
      }

      return res.json({
        status: "success",
        data: farmer,
      });
    } catch (err) {
      next(err); // Pass error to the next middleware (error handler)
    }
  })

  // Route to delete a farmer by ID
  .delete(async (req, res, next) => {
    try {
      const farmerId = req.params.farmerId; // Extract farmerId from the URL

      // Delete the farmer by farmerId
      const result = await Farmer.deleteOne({ farmerId: farmerId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: "error",
          message: `Farmer with ID ${farmerId} not found`,
        });
      }

      return res.json({
        status: "success",
        message: `Farmer with ID ${farmerId} and their crops have been deleted`,
      });
    } catch (err) {
      next(err); // Pass error to the next middleware (error handler)
    }
  });


// app.route('/farmers/:farmerId/crops').post(async (req, res, next) => {
//   try {
//     const farmerId = req.params.farmerId; // Get farmerId from URL
//     const body = req.body;

//     // Validate if the farmer exists
//     const farmer = await Farmer.findOne({ farmerId: farmerId });
//     if (!farmer) {
//       return res.status(404).json({
//         status: 'error',
//         message: `Farmer with ID ${farmerId} not found`,
//       });
//     }

//     // Destructure the body and check for required fields
//     const { cropName, quantity, pricePerUnit, category } = body;
//     if (!cropName || !quantity || !pricePerUnit || !category) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Missing required fields: cropName, quantity, pricePerUnit, and category.',
//       });
//     }

//     // Validate category
//     const validCategories = ['Grains', 'Vegetables', 'Fruits'];
//     if (!validCategories.includes(category)) {
//       return res.status(400).json({
//         status: 'error',
//         message: `Invalid category. Valid categories are: ${validCategories.join(', ')}.`,
//       });
//     }

//     // Create new crop object
//     const newCrop = {
//       cropId: farmer.producedCrops.length + 1, // Auto-generate cropId based on current length
//       cropName,
//       quantity,
//       pricePerUnit,
//       category,
//     };

//     // Push the new crop to the farmer's producedCrops array
//     farmer.producedCrops.push(newCrop);

//     // Save the updated farmer document to the database
//     await farmer.save();

//     return res.json({
//       status: 'success',
//       message: 'Crop added successfully',
//       farmer,
//     });
//   } catch (err) {
//     next(err); // Pass any errors to the next middleware (error handler)
//   }
// });

app.route('/farmers/:farmerId/crops').post(async (req, res, next) => {
  try {
    const farmerId = req.params.farmerId; // Get farmerId from URL
    const body = req.body;

    // Validate if the farmer exists
    const farmer = await Farmer.findOne({ farmerId: farmerId });
    if (!farmer) {
      return res.status(404).json({
        status: 'error',
        message: `Farmer with ID ${farmerId} not found`,
      });
    }

    // Destructure the body and check for required fields
    const { cropName, quantity, pricePerUnit, category, photoBase64 } = body;
    if (!cropName || !quantity || !pricePerUnit || !category || !photoBase64) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: cropName, quantity, pricePerUnit, category, and photoBase64.',
      });
    }

    // Validate category
    const validCategories = ['Grains', 'Vegetables', 'Fruits'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid category. Valid categories are: ${validCategories.join(', ')}.`,
      });
    }

    // Decode and save the crop photo
    const photoBuffer = Buffer.from(photoBase64, 'base64');
    const photoPath = `uploads/crops/${Date.now()}-crop.png`;
    require('fs').writeFileSync(photoPath, photoBuffer);

    // Create new crop object
    const newCrop = {
      cropId: farmer.producedCrops.length + 1, // Auto-generate cropId based on current length
      cropName,
      quantity,
      pricePerUnit,
      category,
      photo: photoPath, // Save the photo path
    };

    // Push the new crop to the farmer's producedCrops array
    farmer.producedCrops.push(newCrop);

    // Save the updated farmer document to the database
    await farmer.save();

    return res.json({
      status: 'success',
      message: 'Crop added successfully',
      farmer,
    });
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler)
  }
});

app.delete('/farmers/:farmerId/crops/:cropId', async (req, res, next) => {
  try {
    const { farmerId, cropId } = req.params;

    // Find the farmer by ID
    const farmer = await Farmer.findOne({ farmerId: parseInt(farmerId, 10) });

    if (!farmer) {
      return res.status(404).json({
        status: 'error',
        message: `Farmer with ID ${farmerId} not found`,
      });
    }

    // Find the index of the crop to be deleted
    const cropIndex = farmer.producedCrops.findIndex(
      (crop) => crop.cropId === parseInt(cropId, 10)
    );

    if (cropIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: `Crop with ID ${cropId} not found for this farmer`,
      });
    }

    // Remove the crop from the producedCrops array
    farmer.producedCrops.splice(cropIndex, 1);

    // Save the updated farmer record to the database
    await farmer.save();

    // Respond with a success message
    return res.json({
      status: 'success',
      message: `Crop with ID ${cropId} removed from farmer with ID ${farmerId}`,
    });
  } catch (err) {
    next(err);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
