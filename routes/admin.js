import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import Property from "../models/Property.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find({});

    const reviewCount = properties.reduce((total, property) => {
      return total + (property.reviews ? property.reviews.length : 0);
    }, 0);

    res.render("admin/dashboard", {
      user: req.user,
      properties,
      reviewCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Shows the edit form for one property
router.get("/properties/:id/edit", isAuthenticated, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.render("admin/edit-property", { property });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading edit form");
  }
});

// Saves the edited property information
router.post("/properties/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedProperty = {
      name: req.body.name,
      island: req.body.island,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      imageURL: req.body.imageURL,
      targetSegment: req.body.targetSegment,
      amenities: req.body.amenities
        ? req.body.amenities.split(",").map((item) => item.trim())
        : []
    };

    await Property.findByIdAndUpdate(req.params.id, updatedProperty);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating property");
  }
});

export default router;