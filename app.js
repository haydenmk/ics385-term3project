import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import Property from "./models/Property.js";
import initializePassport from "./passport-config.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// Allows the React frontend to request data from this backend server
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Adds basic security headers
app.use(helmet());

// Parses form data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets EJS as the view engine
app.set("view engine", "ejs");

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Passport middleware
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// Serve images for admin login page
app.use("/images", express.static("images"));

// Basic home route
app.get("/", (req, res) => {
  res.send("Week 15 Term Project server is running.");
});

// API route for React frontend
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading properties" });
  }
});

// EJS route for viewing properties on backend
app.get("/properties", async (req, res) => {
  try {
    const query = {};

    if (req.query.island) {
      query.island = req.query.island;
    }

    if (req.query.minRating) {
      query["reviews.rating"] = { $gte: Number(req.query.minRating) };
    }

    const properties = await Property.find(query);
    res.render("properties", { properties });
  } catch (error) {
    res.status(500).send("Error loading properties");
  }
});

// Gets one property by ID
app.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.json(property);
  } catch (error) {
    res.status(500).send("Error loading property");
  }
});

// Adds a review to one property
app.post("/properties/:id/reviews", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    const newReview = {
      guestName: req.body.guestName,
      rating: req.body.rating,
      comment: req.body.comment
    };

    property.reviews.push(newReview);
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).send("Error adding review");
  }
});

// Temporary test route for properties
app.get("/properties-test", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).send("Error loading properties");
  }
});

// Google OAuth login route
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/admin/login?googleError=1"
  }),
  (req, res) => {
    res.redirect("/admin/dashboard");
  }
);

// Admin authentication routes
app.use("/admin", authRoutes);
app.use("/admin", adminRoutes);

export default app;