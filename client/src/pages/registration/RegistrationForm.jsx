import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { tournamentData } from "../../data/sports";
import { useRegistrations } from "../../context/RegistrationContext";

function RegistrationForm() {
  const { type, sportId, categoryId } = useParams();

  const navigate = useNavigate();

  const { addRegistration, isRegistered } = useRegistrations();

  const actualType = type === "field-games" ? "field" : type;

  const tournament = tournamentData[actualType];

  const sport = tournament?.sports.find((item) => item.id === sportId);

  const category = sport?.categories?.find((item) => item.id === categoryId);

  const playerCount = category?.players || 1;

  const [players, setPlayers] = useState(
    Array.from({ length: playerCount }, () => ({
      name: "",
      mobile: "",
      flatNo: "",
      age: "",
    })),
  );

  const [error, setError] = useState("");

  if (!tournament || !sport || !category) {
    return (
      <main className="page">
        <h1>Registration Not Found</h1>

        <Link to="/tournament">← Back to Tournament</Link>
      </main>
    );
  }

  const alreadyRegistered = isRegistered(type, sportId, categoryId);

  const totalFee = category.players * category.feePerPlayer;

  const handleChange = (index, field, value) => {
    setPlayers((current) =>
      current.map((player, playerIndex) =>
        playerIndex === index
          ? {
              ...player,
              [field]: value,
            }
          : player,
      ),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (alreadyRegistered) {
      setError("You have already added this category to your cart.");
      return;
    }

    const incompletePlayer = players.some(
      (player) =>
        !player.name.trim() ||
        !player.mobile.trim() ||
        !player.flatNo.trim() ||
        !player.age,
    );

    if (incompletePlayer) {
      setError("Please fill in all details for every player.");
      return;
    }

    addRegistration({
      type,
      sportId,
      sportName: sport.name,
      sportIcon: sport.icon,

      categoryId,
      categoryName: category.name,

      ageGroup: category.ageGroup,
      format: category.format,

      players: category.players,
      feePerPlayer: category.feePerPlayer,
      fee: totalFee,

      playerDetails: players,
    });

    navigate("/registration");
  };

  return (
    <main className="page">
      <Link to={`/tournament/${type}/${sportId}`} className="back-link">
        ← Back to {sport.name}
      </Link>

      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>Add to Cart</h1>

        <p>
          {sport.name} — {category.name}
        </p>
      </div>

      <div className="registration-form-container">
        <div className="registration-form-header">
          <h2>{category.name}</h2>

          <p>Age Group: {category.ageGroup}</p>

          <p>
            {category.players} {category.players === 1 ? "player" : "players"} ×
            ₹{category.feePerPlayer}
          </p>

          <strong>Total: ₹{totalFee}</strong>
        </div>

        <form onSubmit={handleSubmit}>
          {players.map((player, index) => (
            <div className="player-form-card" key={index}>
              <h3>Player {index + 1}</h3>

              <div className="form-group">
                <label>Name of Player</label>

                <input
                  type="text"
                  value={player.name}
                  onChange={(event) =>
                    handleChange(index, "name", event.target.value)
                  }
                  placeholder="Enter player name"
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Mobile Number</label>

                <input
                  type="tel"
                  value={player.mobile}
                  onChange={(event) =>
                    handleChange(index, "mobile", event.target.value)
                  }
                  placeholder="Enter WhatsApp number"
                />
              </div>

              <div className="form-group">
                <label>Flat Number</label>

                <input
                  type="text"
                  value={player.flatNo}
                  onChange={(event) =>
                    handleChange(index, "flatNo", event.target.value)
                  }
                  placeholder="Enter flat number"
                />
              </div>

              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  min="1"
                  value={player.age}
                  onChange={(event) =>
                    handleChange(index, "age", event.target.value)
                  }
                  placeholder="Enter age"
                />
              </div>
            </div>
          ))}

          {error && <p className="form-error">{error}</p>}

          <div className="registration-form-footer">
            <div>
              <span>Total Amount</span>

              <strong>₹{totalFee}</strong>
            </div>

            <button type="submit" className="register-button">
              Add to Cart →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegistrationForm;
