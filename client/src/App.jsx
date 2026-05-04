import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Dashboard from "./Dashboard";
import heroImage from "./assets/sunset-beach.jpg";
import FeaturedRentals from "./components/FeaturedRentals";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const property = {
    name: "North Shore Family Vacation Rentals",
    island: "Oahu",
    tagline: "Relaxing North Shore stays designed for families with children.",
    imageURL: heroImage,
    description:
      "North Shore Family Vacation Rentals is a family-focused hospitality project featuring spacious vacation rentals across Oahu. Our goal is to provide families with children a comfortable, convenient, and welcoming place to stay while enjoying beaches, local dining, and attractions around the island, while being conveniently located in the North Shore.",
    targetSegment: "Families with children seeking spacious and convenient Oahu stays",
    amenities: [
      "Multiple beds",
      "Full kitchen",
      "Beach access",
      "Parking",
      "Wi-Fi",
      "Family-friendly living space"
    ],
    email: "haydenmk@hawaii.edu"
  };

const featuredRentals = [
  {
    name: "Newly Remodeled Turtle Bay Family Condo",
    island: "Oahu",
    description:
      "A newly remodeled family condo in Turtle Bay, Oahu, offering modern amenities and a comfortable stay for families. Includes 2 beds, and easy access to the beach and local attractions.",
    amenities: ["Wi-Fi", "Valet parking", "Kitchenette", "Extra beds", "Pool access"],
    price: "$450 per night | 10% off for stays 7 nights or longer!",
    imageURL: "images/turtle-bay.jpg"
  },
  {
    name: "Hauula Beach House",
    island: "Oahu",
    description:
      "A spacious beach house in Hauula, Oahu, perfect for families looking for a relaxing beach getaway with easy access to local cuisine. Includes 3 beds, a full kitchen, and a private backyard with beach access.",
    amenities: ["Wi-Fi", "Private parking", "Kitchen", "Beach access", "Washer & Dryer", "Grilling area"],
    price: "$500 per night | 15% off for stays 7 nights or longer!",
    imageURL: "images/hauula-house.jpg"
  }
];

  if (showDashboard) {
    return (
      <div className="app">
        <div className="dashboard-link-section">
          <button className="nav-button" onClick={() => setShowDashboard(false)}>
            Back to Marketing Page
          </button>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="app">
      <div id="home">
        <Header onDashboardClick={() => setShowDashboard(true)} />
        <HeroSection
          name={property.name}
          island={property.island}
          tagline={property.tagline}
          imageURL={property.imageURL}
        />
      </div>

      <div id="about">
        <AboutSection
          description={property.description}
          targetSegment={property.targetSegment}
        />
        <FeaturedRentals rentals={featuredRentals} />


      </div>

      <div id="contact">
        <CTASection email={property.email} />
      </div>

      <Footer />
    </div>
  );
}

export default App;