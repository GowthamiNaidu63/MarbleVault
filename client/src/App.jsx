import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import OrderSuccess from "./OrderSuccess";
import AdminOrders from "./AdminOrders";
import TrackOrder from "./TrackOrder";
import AdminLogin from "./AdminLogin";
import MyOrders from "./MyOrders";
import "./App.css";
const marblePhotos = {
  white:
    "https://www.stoneadd.com/photo/marble/italy/Bianco-Carrara-White-Marble-Italy-White-Marble-Colors.jpg",
  black:
    "https://cdn.msisurfaces.com/images/colornames/gradient/fantasy-black-marble.jpg",
  beige:
    "https://www.stoneadd.com/photo/marble/turkey/Spider-Beige-Marble-Colors-Polished.jpg",
  cream:
    "https://antalyamarble.com/upload/urunler/_1f57c61e0b.jpg.webp",
};

const regions = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    subtitle: "India's iconic marble destination",
    image: marblePhotos.white,
  },
  {
    id: "gujarat",
    name: "Gujarat",
    subtitle: "Premium decorative stone collection",
    image: marblePhotos.beige,
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    subtitle: "Known for bold dark natural stone",
    image: marblePhotos.black,
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    subtitle: "Elegant stone for modern spaces",
    image: marblePhotos.cream,
  },
  {
    id: "karnataka",
    name: "Karnataka",
    subtitle: "Classic natural stone varieties",
    image: marblePhotos.beige,
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    subtitle: "Versatile marble for large projects",
    image: marblePhotos.white,
  },
];
function HomePage() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("marbleVaultUser")
  );

  const [profileOpen, setProfileOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState("rajasthan");
  const [cart, setCart] = useState([]);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "UPI",
  });
  useEffect(() => {
  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  const selectedRegionData = regions.find(
    (region) => region.id === selectedRegion
  );

  const regionProducts = useMemo(
    () => products.filter((product) => product.region === selectedRegion),
    [selectedRegion]
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * Number(item.quantity || 0),
    0
  );

  function chooseRegion(regionId) {
    setSelectedRegion(regionId);

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item._id === product._id);

      if (existing) {
        return current;
      }

      return [...current, { ...product, quantity: product.minQty }];
    });
  }

  function updateQuantity(id, value) {
    setCart((current) =>
      current.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(
                item.minQty,
                Number(value) || item.minQty
              ),
            }
          : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item._id !== id)
    );
  }

  function updateCustomer(field, value) {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }
 async function submitOrder(event) {
  event.preventDefault();

  if (!cart.length) {
    document
      .getElementById("regions")
      ?.scrollIntoView({ behavior: "smooth" });

    return;
  }

  try {
    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const orderData = {
      userId: loggedInUser.id,

      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
      },

      items: items,

      paymentMethod: customer.payment,

      totalAmount: cartTotal,
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    console.log("Order saved:", data);
    navigate("/order-success", {
       state: {
    order: data.order,
       },
    });
  } catch (error) {
    console.error("Order error:", error);
    alert(error.message || "Unable to place order");
  }
}


  return (
    <div className="app">
      <header className="navbar">
        <a
          className="logo"
          href="#home"
          aria-label="MarbleVault home"
        >
          <span className="logo-mark">MV</span>

          <span>
            <strong>MarbleVault</strong>
            <small>Elegance in every vein</small>
          </span>
        </a>

        <nav>
  <a href="#home">Home</a>
  <a href="#regions">Regions</a>
  <a href="#products">Marbles</a>
  <a href="#checkout">Checkout</a>
  <a href="#track-order">Track My Order</a>
</nav>

{loggedInUser && (
  <div className="profile-wrapper">
    <button
      className="customer-profile"
      onClick={() => setProfileOpen(!profileOpen)}
    >
      👤 {loggedInUser.name} ▾
    </button>

    {profileOpen && (
      <div className="profile-dropdown">
        <button
          onClick={() => navigate("/my-orders")}
        >
          My Orders
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("marbleVaultUser");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}

<a className="cart-pill" href="#cart">
  Cart <span>{cart.length}</span>
</a>
</header>

      {orderPlaced && (
        <section className="success-banner">
          <div>
            <span className="success-icon">✓</span>

            <div>
              <strong>
                Order request submitted successfully.
              </strong>

              <p>
                Thank you {customer.name}. Your MarbleTrade request
                is ready for supplier confirmation.
              </p>
              {orderId && (
               <p>
               <strong>Order ID:</strong> {orderId}
               </p>
               )}
            </div>
          </div>

          <button onClick={() => setOrderPlaced(false)}>
            Close
          </button>
        </section>
      )}

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              INDIA'S MARBLE MARKETPLACE
            </span>

            <h1>
             Timeless marble for{" "}
              <em>elegant spaces.</em>
             </h1>

            <p>
             MarbleVault brings premium marble collections from India's finest
             stone regions, helping you compare textures, finishes and shades
             to create beautiful, refined spaces.
            </p>

            <div className="hero-actions">
              <a
                className="primary-btn"
                href="#regions"
              >
                Explore marble regions
              </a>

              <a
                className="secondary-btn"
                href="#products"
              >
                View selected marbles
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>6</strong>
                <span>Top regions</span>
              </div>

              <div>
                <strong>24</strong>
                <span>Marble options</span>
              </div>

              <div>
                <strong>₹ / ft²</strong>
                <span>Clear pricing</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
            src="/Images/hero-marble.png"
            alt="Premium marble collection"
            />
          </div>
        </section>

        <section
          className="section regions-section"
          id="regions"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                STEP 01 — SELECT A PLACE
              </span>

              <h2>
                Top marble regions in India
              </h2>

              <p>
                Choose the region first. We will then show four
                popular marble options from that region.
              </p>
            </div>
          </div>

          <div className="region-grid">
            {regions.map((region, index) => (
              <button
                className={`region-card ${
                  selectedRegion === region.id
                    ? "active"
                    : ""
                }`}
                key={region.id}
                onClick={() =>
                  chooseRegion(region.id)
                }
              >
                <img
                  src={region.image}
                  alt={`${region.name} marble texture`}
                />

                <div className="region-overlay" />

                <div className="region-content">
                  <span>0{index + 1}</span>

                  <h3>{region.name}</h3>

                  <p>{region.subtitle}</p>

                  <strong>
                    {selectedRegion === region.id
                      ? "Selected ✓"
                      : "Explore →"}
                  </strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="section products-section"
          id="products"
        >
          <div className="section-heading products-heading">
            <div>
              <span className="eyebrow">
                STEP 02 — CHOOSE YOUR MARBLE
              </span>

              <h2>
                {selectedRegionData?.name} marble collection
              </h2>

              <p>
                Compare four options, check their features
                and add your preferred marble to cart.
              </p>
            </div>

            <div className="selected-region-badge">
              {selectedRegionData?.name}
            </div>
          </div>

          <div className="product-grid">
            {regionProducts.map((product) => {
              const inCart = cart.some(
                (item) => item._id === product._id
              );

              return (
                <article
                  className="product-card"
                  key={product._id}
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={`${product.name} marble slab`}
                    />

                    <span>{product.color}</span>
                  </div>

                  <div className="product-body">
                    <p className="product-region">
                      {selectedRegionData?.name}
                    </p>

                    <h3>{product.name}</h3>

                    <div className="product-specs">
                      <div>
                        <span>Price</span>
                        <strong>
                          ₹{product.price}/ft²
                        </strong>
                      </div>

                      <div>
                        <span>Finish</span>
                        <strong>
                          {product.finish}
                        </strong>
                      </div>

                      <div>
                        <span>Thickness</span>
                        <strong>
                          {product.thickness}
                        </strong>
                      </div>

                      <div>
                        <span>Min order</span>
                        <strong>
                          {product.minQty} ft²
                        </strong>
                      </div>
                    </div>

                    <ul className="feature-preview">
                      {product.features
                        .slice(0, 2)
                        .map((feature) => (
                          <li key={feature}>
                            {feature}
                          </li>
                        ))}
                    </ul>

                    <div className="product-actions">
                      <button
                        className="outline-btn"
                        onClick={() =>
                          setDetailsProduct(product)
                        }
                      >
                        View features
                      </button>

                      <button
                        className={`add-btn ${
                          inCart ? "added" : ""
                        }`}
                        onClick={() =>
                          addToCart(product)
                        }
                        disabled={inCart}
                      >
                        {inCart
                          ? "Added ✓"
                          : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="section cart-section"
          id="cart"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                STEP 03 — REVIEW SELECTION
              </span>

              <h2>Your marble cart</h2>

              <p>
                Update the required square feet or remove
                a marble before checkout.
              </p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <strong>
                Your cart is empty.
              </strong>

              <p>
                Select a region and add at least one marble.
              </p>

              <a
                className="primary-btn"
                href="#regions"
              >
                Choose marble
              </a>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={`${item.name} marble`}
                    />

                    <div className="cart-info">
                      <span>
                        {
                          regions.find(
                            (region) =>
                              region.id === item.region
                          )?.name
                        }
                      </span>

                      <h3>{item.name}</h3>

                      <p>
                        ₹{item.price}/ft² ·{" "}
                        {item.color} ·{" "}
                        {item.finish}
                      </p>
                    </div>

                    <label>
                      Sq. ft.
                      <input
                        type="number"
                        min={item.minQty}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(
                            item._id,
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <div className="cart-price">
                      <strong>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <span>
                  Estimated marble total
                </span>

                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <p>
                  Final delivery, tax and availability can
                  be confirmed by the supplier.
                </p>

                <a
                  className="primary-btn"
                  href="#checkout"
                >
                  Continue to checkout
                </a>
              </aside>
            </div>
          )}
        </section>

        <section
          className="section checkout-section"
          id="checkout"
        >
          <div className="checkout-intro">
            <span className="eyebrow">
              STEP 04 — CUSTOMER DETAILS
            </span>

            <h2>
              Complete your purchase request
            </h2>

            <p>
              Enter your contact and delivery details.
              The payment selection is recorded as your
              preferred method for this frontend version.
            </p>

            <div className="checkout-points">
              <span>
                ✓ Customer contact details
              </span>

              <span>
                ✓ Delivery address
              </span>

              <span>
                ✓ Payment preference
              </span>

              <span>
                ✓ Order summary
              </span>
            </div>
          </div>

          <form
            className="checkout-form"
            onSubmit={submitOrder}
          >
            <div className="form-title">
              <div>
                <span>
                  MarbleTrade checkout
                </span>

                <h3>
                  Customer information
                </h3>
              </div>

              <strong>
                {cart.length} item(s)
              </strong>
            </div>

            <div className="form-grid">
              <label>
                Full name
                <input
                  required
                  value={customer.name}
                  onChange={(e) =>
                    updateCustomer(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Enter your full name"
                />
              </label>

              <label>
                Phone number
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={customer.phone}
                  onChange={(e) =>
                    updateCustomer(
                      "phone",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="10-digit mobile number"
                />
              </label>

              <label className="full-width">
                Email address
                <input
                  required
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    updateCustomer(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="you@example.com"
                />
              </label>

              <label className="full-width">
                Delivery address
                <textarea
                  required
                  rows="3"
                  value={customer.address}
                  onChange={(e) =>
                    updateCustomer(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="House number, street, area"
                />
              </label>

              <label>
                City
                <input
                  required
                  value={customer.city}
                  onChange={(e) =>
                    updateCustomer(
                      "city",
                      e.target.value
                    )
                  }
                  placeholder="City"
                />
              </label>

              <label>
                State
                <input
                  required
                  value={customer.state}
                  onChange={(e) =>
                    updateCustomer(
                      "state",
                      e.target.value
                    )
                  }
                  placeholder="State"
                />
              </label>

              <label className="full-width">
                Pincode
                <input
                  required
                  pattern="[0-9]{6}"
                  maxLength="6"
                  value={customer.pincode}
                  onChange={(e) =>
                    updateCustomer(
                      "pincode",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="6-digit pincode"
                />
              </label>
            </div>

            <div className="payment-block">
              <span className="form-section-label">
                Preferred payment method
              </span>

              <div className="payment-grid">
                {[
                  "UPI",
                  "Debit / Credit Card",
                  "Net Banking",
                  "Pay after confirmation",
                ].map((method) => (
                  <label
                    className={`payment-option ${
                      customer.payment === method
                        ? "active"
                        : ""
                    }`}
                    key={method}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={
                        customer.payment ===
                        method
                      }
                      onChange={(e) =>
                        updateCustomer(
                          "payment",
                          e.target.value
                        )
                      }
                    />

                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="checkout-total">
              <span>
                Estimated marble total
              </span>

              <strong>
                ₹
                {cartTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={!cart.length}
            >
              {cart.length
                ? "Submit order request →"
                : "Add marble to cart first"}
            </button>
          </form>
        </section>
      </main>

      {detailsProduct && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setDetailsProduct(null)
          }
        >
          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setDetailsProduct(null)
              }
            >
              ×
            </button>

            <img
              src={detailsProduct.image}
              alt={`${detailsProduct.name} marble`}
            />

            <div className="modal-content">
              <span className="eyebrow">
                PRODUCT FEATURES
              </span>

              <h2>
                {detailsProduct.name}
              </h2>

              <p className="modal-color">
                {detailsProduct.color} ·{" "}
                {detailsProduct.finish}
              </p>

              <strong className="modal-price">
                ₹{detailsProduct.price} / sq. ft.
              </strong>

              <ul>
                {detailsProduct.features.map(
                  (feature) => (
                    <li key={feature}>
                      {feature}
                    </li>
                  )
                )}
              </ul>

              <button
                className="primary-btn modal-add"
                onClick={() => {
                  addToCart(detailsProduct);
                  setDetailsProduct(null);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="logo footer-logo">
          <span className="logo-mark">
            MT
          </span>

          <span>
            <strong>
              MarbleTrade
            </strong>

            <small>
              Natural stone marketplace
            </small>
          </span>
        </div>

        <p>
          Explore. Compare. Select. Build with the right marble.
        </p>

        <span>
          © {new Date().getFullYear()} MarbleTrade · MERN Project Frontend
        </span>
      </footer>
    </div>
  );
}
function App() {
  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/my-orders" element={<MyOrders />} />
  <Route path="/order-success" element={<OrderSuccess />} />
  <Route path="/track-order" element={<TrackOrder />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/orders" element={<AdminOrders />} />
</Routes>
  );
}

export default App;
// Customer Login: http://localhost:5173/login
// Admin Login: http://localhost:5173/admin/login