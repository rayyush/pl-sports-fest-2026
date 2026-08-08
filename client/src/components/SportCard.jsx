import { Link } from "react-router-dom";

function SportCard({ type, sport }) {
  return (
    <Link to={`/tournament/${type}/${sport.id}`} className="sport-card">
      <div className="sport-icon">{sport.icon}</div>

      <h2>{sport.name}</h2>

      <p>{sport.description}</p>

      <span>View Categories →</span>
    </Link>
  );
}

export default SportCard;
