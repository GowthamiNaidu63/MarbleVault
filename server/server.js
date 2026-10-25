const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// MONGODB CONNECTION
// =============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// =============================
// HOME ROUTE
// =============================
app.get("/", (req, res) => {
  res.send("MarbleVault backend is running");
});

// =============================
// CUSTOMER REGISTER
// =============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        message: "Name, phone number and password are required",
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        phone: savedUser.phone,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// =============================
// CUSTOMER LOGIN
// =============================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone number and password are required",
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({
        message: "Invalid phone number or password",
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      return res.status(401).json({
        message: "Invalid phone number or password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

// =============================
// GET ALL PRODUCTS
// =============================
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// =============================
// GET ALL ORDERS
// =============================
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// =============================
// GET ORDERS FOR ONE CUSTOMER
// =============================
app.get("/api/orders/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer orders",
      error: error.message,
    });
  }
});

// =============================
// CREATE NEW ORDER
// =============================
app.post("/api/orders", async (req, res) => {
  try {
    const {
      userId,
      customer,
      items,
      paymentMethod,
      totalAmount,
    } = req.body;

    if (
      !userId ||
      !customer ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          "Logged-in user, customer details and cart items are required",
      });
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      return res.status(400).json({
        message: "All customer details are required",
      });
    }

    if (!/^\d{10}$/.test(customer.phone)) {
      return res.status(400).json({
        message:
          "Phone number must be exactly 10 digits",
      });
    }

    if (!/^\d{6}$/.test(customer.pincode)) {
      return res.status(400).json({
        message:
          "Pincode must be exactly 6 digits",
      });
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        customer.email
      )
    ) {
      return res.status(400).json({
        message:
          "Please enter a valid email address",
      });
    }

    if (
      !paymentMethod ||
      !totalAmount ||
      totalAmount <= 0
    ) {
      return res.status(400).json({
        message:
          "Valid payment method and total amount are required",
      });
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        message: "Customer account not found",
      });
    }

    const order = new Order({
      userId,
      customer,
      items,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// =============================
// GET ONE ORDER BY ID
// =============================
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({
      message: "Invalid order ID",
    });
  }
});

// =============================
// UPDATE ORDER STATUS
// =============================
app.patch(
  "/api/orders/:orderId/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Dispatched",
      "Delivered",
      "Cancelled",
];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid order status",
        });
      }

      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.orderId,
          { status },
          {
            returnDocument: "after",
          }
        );

      if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json({
        message:
          "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update order status",
        error: error.message,
      });
    }
  }
);

// =============================
// SERVER
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});