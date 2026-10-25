import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem(
        "marbleVaultUser",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
          boxShadow: "0 18px 45px rgba(31,59,50,0.12)",
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
          Welcome Back
        </h1>

        <p
          style={{
            color: "#716f67",
            marginBottom: "25px",
          }}
        >
          Login to access your orders and delivery status.
        </p>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              fontWeight: "700",
            }}
          >
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10 digit phone number"
            maxLength="10"
            required
            style={{
              width: "100%",
              padding: "13px",
              margin: "8px 0 18px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: "700",
            }}
          >
            Password
          </label>

          <div
            style={{
              position: "relative",
              marginTop: "8px",
              marginBottom: "10px",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "13px 48px 13px 13px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#1f3b32",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Forgot Password?
            </Link>
          </div>

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

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#1f3b32",
              color: "white",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            marginTop: "22px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1f3b32",
              fontWeight: "700",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;