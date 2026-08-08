import { Link, useNavigate } from "react-router-dom";

import { useRegistrations } from "../../context/RegistrationContext";

function Registration() {
  const navigate = useNavigate();

  const { registrations, removeRegistration, totalAmount, clearRegistrations } =
    useRegistrations();

  const totalPlayers = registrations.reduce(
    (total, registration) => total + Number(registration.players || 0),
    0,
  );

  if (registrations.length === 0) {
    return (
      <main className="page">
        <div className="page-header">
          <p>PL SPORTS FEST 2026</p>

          <h1>Your Registration</h1>

          <span>You haven't added any sports yet.</span>
        </div>

        <div className="empty-registration">
          <div className="empty-registration-icon">🏆</div>

          <h2>No Sports Selected</h2>

          <p>Choose a sport and category to start your registration.</p>

          <Link to="/tournament" className="register-button">
            Browse Sports
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>Your Registration</h1>

        <span>Review your selected sports before continuing to payment.</span>
      </div>

      <div className="registration-summary">
        {/* Selected Sports */}

        <div className="registration-items">
          {registrations.map((registration) => (
            <div
              className="registration-item"
              key={`${registration.type}-${registration.sportId}-${registration.categoryId}`}
            >
              <div className="registration-item-top">
                <div className="registration-item-title">
                  <span className="registration-sport-icon">
                    {registration.sportIcon || "🏆"}
                  </span>

                  <div>
                    <h2>{registration.sportName}</h2>

                    <p>{registration.categoryName}</p>
                  </div>
                </div>

                <strong className="registration-item-fee">
                  ₹{registration.fee}
                </strong>
              </div>

              <div className="registration-player-count">
                {registration.players}{" "}
                {registration.players === 1 ? "Player" : "Players"}
              </div>

              {/* Player Details */}

              <div className="registration-players">
                {registration.playerDetails?.map((player, index) => (
                  <div className="registered-player" key={index}>
                    <h3>Player {index + 1}</h3>

                    <div className="player-details-grid">
                      <div>
                        <span>Name</span>
                        <strong>{player.name}</strong>
                      </div>

                      <div>
                        <span>WhatsApp</span>
                        <strong>{player.mobile}</strong>
                      </div>

                      <div>
                        <span>Flat No.</span>
                        <strong>{player.flatNo}</strong>
                      </div>

                      <div>
                        <span>Age</span>
                        <strong>{player.age}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="remove-registration"
                onClick={() =>
                  removeRegistration(
                    registration.type,
                    registration.sportId,
                    registration.categoryId,
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="registration-total-card">
          <h2>Registration Summary</h2>

          <div className="summary-row">
            <span>Sports Selected</span>

            <strong>{registrations.length}</strong>
          </div>

          <div className="summary-row">
            <span>Total Players</span>

            <strong>{totalPlayers}</strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total Amount</span>

            <strong>₹{totalAmount}</strong>
          </div>

          <button
            className="register-button summary-payment-button"
            onClick={() => navigate("/payment")}
          >
            Continue to Payment →
          </button>

          <Link to="/tournament" className="add-more-button">
            + Add More Sports
          </Link>

          <button className="clear-registration" onClick={clearRegistrations}>
            Clear Registration
          </button>
        </div>
      </div>
    </main>
  );
}

export default Registration;
