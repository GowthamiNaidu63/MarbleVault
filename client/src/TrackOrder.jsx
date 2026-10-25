import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TrackOrder() {
  const location = useLocation();

  const [orderId, setOrderId] = useState(location.state?.orderId || "");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchOrder(id = orderId) {
    if (!id.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found");
      }

      setOrder(data);
    } catch (err) {
      setOrder(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.state?.orderId) {
      fetchOrder(location.state.orderId);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f2e8",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
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
          Track My Order
        </h1>

        <p
          style={{
            color: "#716f67",
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Enter your Order ID to view the latest status of your MarbleVault
          order.
        </p>

        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            border: "1px solid #ddd5c8",
            boxShadow: "0 14px 35px rgba(31, 59, 50, 0.08)",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
            }}
          >
            Order ID
          </label>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID"
              style={{
                flex: "1",
                minWidth: "250px",
                padding: "14px",
                border: "1px solid #ddd5c8",
                fontSize: "14px",
              }}
            />

            <button
              onClick={() => fetchOrder()}
              style={{
                background: "#1f3b32",
                color: "#ffffff",
                border: "none",
                padding: "14px 24px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Checking..." : "Track Order"}
            </button>
          </div>

          {error && (
            <p
              style={{
                marginTop: "18px",
                color: "#a33a3a",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

          {order && (
            <div
              style={{
                marginTop: "30px",
                padding: "24px",
                background: "#f7f2e8",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1f3b32",
                }}
              >
                Order Details
              </h2>

              <p>
                <strong>Order ID:</strong> {order._id}
              </p>

              <p>
                <strong>Customer:</strong> {order.customer?.name}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: "#b89257",
                    fontWeight: "700",
                  }}
                >
                  {order.status}
                </span>
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {order.totalAmount?.toLocaleString("en-IN")}
              </p>

              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>

              <p>
                <strong>Items:</strong> {order.items?.length}
              </p>
            </div>
          )}

          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "25px",
              color: "#1f3b32",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            ← Back to MarbleVault
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;