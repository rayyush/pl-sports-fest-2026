import { Link, useParams } from "react-router-dom";

import { tournamentData } from "../../data/sports";
import CategoryCard from "../../components/CategoryCard";

function Sport() {
  const { type, sportId } = useParams();

  // URL uses "field-games", while data uses "field"
  const actualType = type === "field-games" ? "field" : type;

  const tournament = tournamentData[actualType];

  const sport = tournament?.sports.find((item) => item.id === sportId);

  if (!tournament || !sport) {
    return (
      <main className="page">
        <h1>Sport not found</h1>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to={`/tournament/${type}`} className="back-link">
        ← Back to {tournament.name}
      </Link>

      <div className="page-header sport-header">
        <div className="large-icon">{sport.icon}</div>

        <h1>{sport.name}</h1>

        <p>{sport.description}</p>

        {sport.ageGroup && (
          <p>
            <strong>Age Group:</strong> {sport.ageGroup}
          </p>
        )}

        {sport.externalRegistration && (
          <p>
            <strong>Entry Fee:</strong> ₹{sport.fee}
          </p>
        )}
      </div>

      {sport.externalRegistration ? (
        <div className="external-registration">
          <h2>Football Registration</h2>

          <p>Football registration will be completed through Google Forms.</p>

          <a
            href={sport.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="register-button"
          >
            Register via Google Form →
          </a>
        </div>
      ) : (
        <>
          <h2 className="section-title">Choose Your Category</h2>

          <div className="category-list">
            {sport.categories.map((category) => (
              <CategoryCard
                key={category.id}
                type={type}
                sportId={sport.id}
                sportName={sport.name}
                category={category}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Sport;
