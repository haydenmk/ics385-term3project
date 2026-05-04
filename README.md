## Author
# Hayden Suzuki

# North Shore Family Vacation Rentals

## Overview

North Shore Family Vacation Rentals is a full-stack hospitality web application focused on family-friendly vacation rentals on Oahu, especially the North Shore. The application includes a public marketing page, a visitor dashboard, and a protected admin dashboard.

The goal of the project is to help families with children find comfortable and convenient vacation rentals while also giving property managers a protected admin area for viewing project information.

## AI Attribution
ChatGPT was used to build most of the code involved in this project, then reviewed via the author.

## Project Details

- Course: ICS 385
- Project Name: North Shore Family Vacation Rentals
- Target Location: Oahu, especially the North Shore
- Target Visitor Segment: Families with children
- Final Deployment Platform: Render
- Frontend Deployment Platform: GitHub Pages
- Database: MongoDB Atlas

## Live Links

- Live Full-Stack Render Site: https://ics385-term3project.onrender.com
- GitHub Pages Frontend Site: https://haydenmk.github.io/ics385-term3project/
- GitHub Repository: https://github.com/haydenmk/ics385-term3project

## Technology Stack

### Frontend
- React
- Vite
- CSS
- Chart.js
- react-chartjs-2

### Backend
- Node.js
- Express.js
- EJS
- MongoDB Atlas
- Mongoose

### Authentication and Security
- Passport.js
- passport-local
- passport-google-oauth20
- bcrypt
- express-session
- connect-mongo
- helmet
- dotenv

### Testing and Deployment
- Jest
- Supertest
- Render
- GitHub Pages

## Main Features

- Public React marketing page for North Shore vacation rentals
- Featured rental section with two rentals:
  - Newly Remodeled Turtle Bay Family Condo
  - Hauula Beach House
- Rental images, descriptions, amenities, and price information
- Visitor dashboard with tourism statistics, charts, and weather information
- Backend admin login page using EJS
- Local email/password login with bcrypt password hashing
- Google OAuth 2.0 sign-in
- Protected admin dashboard route
- Persistent sessions using connect-mongo
- MongoDB Atlas database connection
- Jest and Supertest route verification

## Project Structure

```txt
Term 3 Project/
  app.js
  server.js
  package.json
  package-lock.json
  README.md
  .env.example
  .gitignore
  passport-config.js
  seed-admin.js

  models/
    Property.js
    User.js

  routes/
    admin.js
    auth.js

  middleware/
    isAuthenticated.js

  scripts/
    seed.js

  tests/
    auth.test.js

  views/
    properties.ejs
    admin/
      dashboard.ejs
      edit-property.ejs
      login.ejs

  images/
    hauula-house.jpg
    turtle-bay.jpg

  client/
    package.json
    package-lock.json
    README.md
    index.html
    vite.config.js
    eslint.config.js
    .env.example
    .gitignore

    public/

    src/
      App.jsx
      App.css
      Dashboard.jsx
      index.css
      main.jsx

      assets/
        sunset-beach.jpg

      charts/
        ArrivalChart.jsx
        OriginChart.jsx

      components/
        AboutSection.jsx
        AmenitiesSection.jsx
        CTASection.jsx
        FeaturedRentals.jsx
        Footer.jsx
        GoogleTranslate.jsx
        Header.jsx
        HeroSection.jsx
        MetricCards.jsx
        WeatherWidget.jsx

      data/
        dashboardData.js
```
## Acceptance Criteria

- Given a user visits the Marketing page, when the page loads, then HeroSection should display both North Shore property’s information and amenities. | PASS
- Given a user clicks on the “Book Now!” button, when the “Book Now!” button is clicked, then they will be directed to a Google Form. | PASS
- Given a user is on a mobile device, when the webpage is loaded then the aspect ratio will adjust and buttons will work. | PASS
- Given a user presses the Visitor Dashboard, when the dashboard loads then an embedded YouTube livestream of the North Shore will play. | PASS
- Given a user with admin privileges clicks the “Admin” tab, when the page loads then they will be able to edit property information. | PASS
- Given the “Contact Us” button is clicked, when the button is clicked then it will redirect to the property manager’s email. | PASS

## Test Output Screenshot
<img width="744" height="313" alt="image" src="https://github.com/user-attachments/assets/24f82911-8aa1-470f-ab4a-fff1ed78ecf2" />
