import { Link, useParams } from "react-router-dom";

import { tournamentData } from "../../data/sports";
import SportCard from "../../components/SportCard";

function TournamentSection() {
  const { type } = useParams();

  // URL uses "field-games", while data uses "field"
  const actualType = type === "field-games" ? "field" : type;

  const tournament = tournamentData[actualType];

  if (!tournament) {
    return (
      <main className="page">
        <h1>Tournament not found</h1>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/tournament" className="back-link">
        ← Back to Tournament
      </Link>

      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>{tournament.name}</h1>

        <p>{tournament.description}</p>

        {actualType === "field" && <strong>15 August 2026</strong>}
      </div>

      <div className="sport-grid">
        {tournament.sports.map((sport) => (
          <SportCard key={sport.id} type={type} sport={sport} />
        ))}
      </div>
    </main>
  );
}

export default TournamentSection;
