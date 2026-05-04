import { useEffect, useState } from "react";

function FeaturedRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRentals() {
      try {
        const response = await fetch("http://localhost:3000/api/properties");
        const data = await response.json();

        setRentals(data);
      } catch (error) {
        console.error("Error loading rentals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRentals();
  }, []);

  if (loading) {
    return (
      <section className="featured-rentals">
        <h2>Featured Vacation Rentals</h2>
        <p>Loading rentals...</p>
      </section>
    );
  }

  return (
    <section className="featured-rentals">
      <h2>Featured Vacation Rentals</h2>

      <div className="rental-grid">
        {rentals.map((rental) => (
          <div className="rental-card" key={rental._id}>
            <img
              src={`${import.meta.env.BASE_URL}${rental.imageURL}`}
              alt={rental.name}
              className="rental-image"
            />

            <h3>{rental.name}</h3>

            <p className="rental-price">
              {rental.price || "Price not listed"}
            </p>

            <p>{rental.description}</p>

            <p>
              <strong>Location:</strong> {rental.island}
            </p>

            <p>
              <strong>Amenities:</strong>{" "}
              {rental.amenities && rental.amenities.length > 0
                ? rental.amenities.join(", ")
                : "No amenities listed"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedRentals;