import { useNavigate } from "react-router-dom";

function CategoryCard({ type, sportId, category }) {
  const navigate = useNavigate();

  const totalFee = category.players * category.feePerPlayer;

  const handleRegistration = () => {
    navigate(`/registration/form/${type}/${sportId}/${category.id}`);
  };

  return (
    <div className="category-card">
      <div className="category-card-content">
        <div>
          <h3>{category.name}</h3>

          <p className="category-age">Age Group: {category.ageGroup}</p>

          <p className="category-format">
            {category.players} {category.players === 1 ? "player" : "players"} ×
            ₹{category.feePerPlayer}
          </p>

          <p className="category-total">Total: ₹{totalFee}</p>
        </div>

        <button className="register-button" onClick={handleRegistration}>
          Add to Registration
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
