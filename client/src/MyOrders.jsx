import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("marbleVaultUser")
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    async function fetchMyOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/orders/user/${loggedInUser.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load your orders"
          );
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f7f2e8",
          padding: "60px 20px",
        }}
      >
        <h2 style={{ color: "#1f3b32" }}>
          Loading your orders...
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f2e8",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
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
            marginBottom: "8px",
          }}
        >
          My Orders
        </h1>

        <p
          style={{
            color: "#716f67",
            marginBottom: "30px",
          }}
        >
          Welcome {loggedInUser?.name}. View your orders,
          current status and estimated delivery.
        </p>

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

        {!error && orders.length === 0 && (
          <div
            style={{
              background: "#ffffff",
              padding: "35px",
              border: "1px solid #ddd5c8",
            }}
          >
            <h3 style={{ color: "#1f3b32" }}>
              No orders yet
            </h3>

            <p style={{ color: "#716f67" }}>
              You haven't placed any MarbleVault orders yet.
            </p>

            <Link
              to="/"
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "12px 20px",
                background: "#1f3b32",
                color: "white",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Explore Marbles
            </Link>
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#ffffff",
              padding: "28px",
              marginBottom: "22px",
              border: "1px solid #ddd5c8",
              boxShadow:
                "0 12px 30px rgba(31,59,50,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#716f67",
                    fontSize: "13px",
                  }}
                >
                  Order ID
                </p>

                <strong style={{ color: "#1f3b32" }}>
                  {order._id}
                </strong>
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#716f67",
                    fontSize: "13px",
                  }}
                >
                  Status
                </p>

                <strong
                  style={{
                    color: "#b89257",
                  }}
                >
                  {order.status}
                </strong>
              </div>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #eee7dc",
                margin: "22px 0",
              }}
            />

            {order.items?.map((item, index) => (
              <div
                key={`${order._id}-${index}`}
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "85px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div>
                  <strong style={{ color: "#1f3b32" }}>
                    {item.name}
                  </strong>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#716f67",
                    }}
                  >
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #eee7dc",
                margin: "22px 0",
              }}
            />

            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{order.totalAmount?.toLocaleString("en-IN")}
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
              <strong>Ordered On:</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString(
                    "en-IN"
                  )
                : "-"}
            </p>
          </div>
        ))}

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "10px",
            color: "#1f3b32",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          ← Back to MarbleVault
        </Link>
      </div>
    </div>
  );
}

export default MyOrders;