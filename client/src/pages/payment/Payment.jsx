import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegistrations } from "../../context/RegistrationContext";

const API_URL = import.meta.env.VITE_API_URL;

function Payment() {
  const navigate = useNavigate();

  const { registrations, totalAmount } = useRegistrations();

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!paymentScreenshot) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(paymentScreenshot);

    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [paymentScreenshot]);

  if (registrations.length === 0) {
    return (
      <main className="page">
        <div className="page-header">
          <p>PL SPORTS FEST 2026</p>

          <h1>Your Cart Is Empty</h1>

          <span>
            Please add at least one sport before proceeding to payment.
          </span>
        </div>

        <div className="empty-registration">
          <div className="empty-registration-icon">🏆</div>

          <h2>No Sports Selected</h2>

          <p>
            You need to add at least one sport to your cart before continuing to
            payment.
          </p>

          <Link to="/tournament" className="register-button">
            Browse Sports →
          </Link>
        </div>
      </main>
    );
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      setPaymentScreenshot(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");

      event.target.value = "";
      setPaymentScreenshot(null);

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Screenshot must be smaller than 5 MB.");

      event.target.value = "";
      setPaymentScreenshot(null);

      return;
    }

    setPaymentScreenshot(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!paymentScreenshot) {
      setError("Please upload your payment screenshot before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("registrations", JSON.stringify(registrations));

      formData.append("totalAmount", totalAmount);

      formData.append("paymentScreenshot", paymentScreenshot);

      const response = await fetch(`${API_URL}/api/registrations`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration submission failed.");
      }

      console.log("Registration submitted:", data);

      navigate("/registration/success");
    } catch (error) {
      console.error("Submission error:", error);

      setError(error.message || "Failed to submit registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page payment-page">
      <Link to="/registration" className="back-link">
        ← Back to Cart
      </Link>

      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>Complete Payment</h1>

        <span>
          Pay the total amount using the QR code and upload your payment
          screenshot below.
        </span>
      </div>

      <div className="payment-container">
        {/* PAYMENT BREAKDOWN */}

        <section className="payment-card">
          <div className="payment-card-header">
            <h2>Your Cart</h2>

            <p>Review all selected events before making the payment.</p>
          </div>

          <div className="payment-breakdown">
            {registrations.map((registration) => (
              <div
                className="payment-breakdown-item"
                key={`${registration.type}-${registration.sportId}-${registration.categoryId}`}
              >
                <div className="payment-sport-info">
                  <span className="payment-sport-icon">
                    {registration.sportIcon || "🏆"}
                  </span>

                  <div>
                    <h3>{registration.sportName}</h3>

                    <p>{registration.categoryName}</p>

                    <span>
                      {registration.players}{" "}
                      {registration.players === 1 ? "Player" : "Players"} × ₹
                      {registration.feePerPlayer}
                    </span>
                  </div>
                </div>

                <strong>₹{registration.fee}</strong>
              </div>
            ))}
          </div>

          <div className="payment-total">
            <span>Total Amount Payable</span>

            <strong>₹{totalAmount}</strong>
          </div>
        </section>

        {/* QR CODE */}

        <section className="payment-card qr-payment-card">
          <div className="payment-card-header">
            <h2>Scan & Pay</h2>

            <p>
              Scan the QR code below and pay exactly{" "}
              <strong>₹{totalAmount}</strong>.
            </p>
          </div>

          <div className="qr-placeholder">
            <div className="qr-placeholder-inner">
              <img
                src="/payment-qr.jpg"
                alt="Payment QR code"
                className="payment-screenshot-preview"
              />
            </div>
          </div>

          <div className="payment-instruction">
            <span>💡</span>

            <p>
              After completing the payment, take a screenshot of the successful
              transaction and upload it below.
            </p>
          </div>
        </section>

        {/* SCREENSHOT UPLOAD */}

        <section className="payment-card">
          <div className="payment-card-header">
            <h2>Upload Payment Screenshot</h2>

            <p>
              Upload a screenshot showing your successful payment transaction.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="payment-screenshot" className="upload-area">
              {!previewUrl ? (
                <>
                  <div className="upload-icon">📤</div>

                  <strong>Click to upload screenshot</strong>

                  <span>JPG, JPEG or PNG • Maximum 5 MB</span>
                </>
              ) : (
                <>
                  <img
                    src={previewUrl}
                    alt="Payment screenshot preview"
                    className="payment-screenshot-preview"
                  />

                  <strong>Screenshot selected</strong>

                  <span>{paymentScreenshot.name}</span>
                </>
              )}
            </label>

            <input
              id="payment-screenshot"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              hidden
            />

            {error && <p className="form-error">{error}</p>}

            <div className="payment-submit-section">
              <div>
                <span>Amount to Submit</span>

                <strong>₹{totalAmount}</strong>
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration →"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Payment;
