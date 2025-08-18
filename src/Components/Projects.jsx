function Projects() {
  return (
    <div className="projects" style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Portfolio Website</strong>
          <ul>
            <li>Personal portfolio website showcasing my skills, projects, and contact details.</li>
            <li>Built with React for dynamic and responsive UI.</li>
            <li>Deployed on a cloud platform for easy access.</li>
          </ul>
        </li>

        <li>
          <strong>Quiz App</strong>
          <ul>
            <li>Full-stack quiz application built with MongoDB, Express.js, React, and Node.js (MERN).</li>
            <li>Real-time scoring and leaderboard functionality.</li>
            <li>REST APIs built with Node.js & Express, and data stored in MongoDB.</li>
            <li>Responsive UI built with React for smooth navigation and dynamic rendering.</li>
          </ul>
        </li>

        <li>
          <strong>Weather App</strong>
          <ul>
            <li>Weather forecasting application built using React and weather APIs.</li>
            <li>Users can search for any city and get real-time weather updates (temperature, humidity, wind speed, conditions).</li>
            <li>Integrated with OpenWeatherMap API for live weather data.</li>
            <li>Built with React hooks for state management and API handling.</li>
          </ul>
        </li>

        <li>
          <strong>Amazon Clone</strong>
          <ul>
            <li>E-commerce clone of Amazon built using HTML, CSS, and JavaScript.</li>
            <li>Features include product listings, add-to-cart, and checkout flow.</li>
            <li>Implemented local storage to persist cart items.</li>
            <li>Interactive UI mimicking Amazon’s product browsing and shopping cart experience.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Projects;
