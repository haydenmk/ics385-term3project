function FeaturedRentals({ rentals }) {
  return (
    <section className="featured-rentals">
      <h2>Featured Vacation Rentals</h2>

      <div className="rental-grid">
        {rentals.map((rental, index) => (
          <div className="rental-card" key={index}>
            <img
              src={`${import.meta.env.BASE_URL}images/${rental.imageURL}`}
              alt={rental.name}
              className="rental-image"
            />

            <h3>{rental.name}</h3>

            <p className="rental-price">{rental.price}</p>

            <p>{rental.description}</p>

            <p>
              <strong>Location:</strong> {rental.island}
            </p>

            <p>
              <strong>Amenities:</strong> {rental.amenities.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedRentals;