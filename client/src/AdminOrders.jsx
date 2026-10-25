import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      if (!response.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await response.json();

      setOrders(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(orderId, status) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading orders...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ padding: "40px" }}>
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f2e8",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
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
            marginBottom: "30px",
          }}
        >
          Supplier Order Management
        </h1>

        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#ffffff",
                padding: "25px",
                marginBottom: "22px",
                border: "1px solid #ddd5c8",
                boxShadow:
                  "0 10px 30px rgba(31, 59, 50, 0.08)",
              }}
            >
              <h3
                style={{
                  color: "#1f3b32",
                }}
              >
                Order ID: {order._id}
              </h3>

              <p>
                <strong>Customer:</strong>{" "}
                {order.customer?.name}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer?.phone}
              </p>

              <p>
                <strong>Total:</strong> ₹
                {order.totalAmount?.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Estimated Delivery:</strong>{" "}
                {order.estimatedDelivery ||
                  "2-3 business days after confirmation"}
              </p>

              <p>
                <strong>Current Status:</strong>{" "}
                <span
                  style={{
                    color: "#b89257",
                    fontWeight: "700",
                  }}
                >
                  {order.status}
                </span>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "18px",
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Confirmed"
                    )
                  }
                >
                  Confirm Order
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Processing"
                    )
                  }
                >
                  Processing
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Dispatched"
                    )
                  }
                >
                  Dispatch
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Delivered"
                    )
                  }
                >
                  Delivered
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Cancelled"
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;