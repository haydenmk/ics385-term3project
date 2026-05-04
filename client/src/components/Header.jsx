import GoogleTranslate from "./GoogleTranslate";

function Header({ onDashboardClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h2>North Shore Family Vacation Rentals</h2>

        <nav>
          <GoogleTranslate />
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          <button className="nav-button" onClick={onDashboardClick}>
            Visitor Dashboard
          </button>

          <a href="http://localhost:3000/admin/login">Admin</a>
          <a href="#book" className="book-now-button">Book Now!</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;