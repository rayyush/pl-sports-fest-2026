import { Link } from "react-router-dom";

function TournamentCard({ type, title, description, icon, date }) {
  return (
    <Link to={`/tournament/${type}`} className="tournament-card">
      <div className="card-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{description}</p>

      {date && <span className="event-date">{date}</span>}

      <span className="card-link">View Sports →</span>
    </Link>
  );
}

export default TournamentCard;
