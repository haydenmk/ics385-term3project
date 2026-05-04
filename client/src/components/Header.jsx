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

          <a href="https://ics385-term3project.onrender.com/admin/login">
            Admin
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd-gjINIcQDZHrsxeLBW1mDP7VGu9c1GJUAvo639JUTDKwuSw/viewform?usp=sharing&ouid=109622262402141901543"
            className="book-now-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now!
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;