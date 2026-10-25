import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
      data.error || data.message || "Registration failed"
    );
   }

      localStorage.setItem(
        "marbleVaultUser",
        JSON.stringify(data.user)
      );

      setMessage("Welcome to MarbleVault!");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "13px",
    margin: "8px 0 18px",
    boxSizing: "border-box",
    border: "1px solid #b8b3aa",
    fontSize: "15px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "700",
    color: "#111",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f2e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#ffffff",
          padding: "40px",
          border: "1px solid #ddd5c8",
          boxShadow: "0 18px 45px rgba(31, 59, 50, 0.12)",
        }}
      >
        <p
          style={{
            color: "#b89257",
            fontWeight: "700",
            letterSpacing: "2px",
            fontSize: "12px",
          }}
        >
          MARBLEVAULT
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#1f3b32",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#716f67",
            marginBottom: "25px",
          }}
        >
          Register to track your orders and delivery status.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10 digit phone number"
            maxLength="10"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Create Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
            style={inputStyle}
          />

          {error && (
            <p
              style={{
                color: "#a33a3a",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

          {message && (
            <p
              style={{
                color: "#1f3b32",
                fontWeight: "700",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#1f3b32",
              color: "#ffffff",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          style={{
            marginTop: "22px",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1f3b32",
              fontWeight: "700",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;