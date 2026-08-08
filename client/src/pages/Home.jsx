import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="hero-label">WELCOME TO</p>

        <h1>PL SPORTS FEST 2026</h1>

        <p className="hero-description">
          Bring your society together and compete across multiple sporting
          events.
        </p>

        <Link to="/tournament" className="primary-button">
          Explore Tournament →
        </Link>
      </section>

      <section className="home-info">
        <h2>Compete. Connect. Celebrate.</h2>

        <p>
          Choose your event, select your category and register for PL Sports
          Fest 2026.
        </p>
      </section>
    </main>
  );
}

export default Home;
