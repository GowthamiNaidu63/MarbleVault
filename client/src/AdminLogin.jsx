import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (username === "admin" && password === "admin123") {
      setError("");
      navigate("/admin/orders");
    } else {
      setError("Invalid username or password");
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
          maxWidth: "430px",
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
            marginBottom: "10px",
          }}
        >
          Supplier Login
        </h1>

        <p
          style={{
            color: "#716f67",
            marginBottom: "25px",
            lineHeight: "1.6",
          }}
        >
          Login to manage customer orders and update order status.
        </p>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
            }}
          >
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "18px",
              border: "1px solid #ddd5c8",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "13px",
              marginBottom: "18px",
              border: "1px solid #ddd5c8",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "#a33a3a",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
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
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;