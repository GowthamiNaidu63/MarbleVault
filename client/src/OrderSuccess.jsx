import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

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
          maxWidth: "650px",
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
            marginBottom: "15px",
          }}
        >
          Order submitted successfully
        </h1>

        <p style={{ color: "#716f67", lineHeight: "1.7" }}>
          Thank you for choosing MarbleVault. Your order request has been
          received and is ready for supplier confirmation.
        </p>

        {order && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#f7f2e8",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹
              {order.totalAmount?.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/track-order"
            state={{ orderId: order?._id }}
            style={{
              background: "#1f3b32",
              color: "white",
              padding: "14px 24px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Track My Order
          </Link>

          <Link
            to="/"
            style={{
              border: "1px solid #1f3b32",
              color: "#1f3b32",
              padding: "14px 24px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;