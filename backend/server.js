require("dotenv").config();
const express = require('express');
const cors = require('cors');
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/users")
const connectDB = require('./config/db');
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cartRoute = require("./routes/cart");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
  
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/carts", cartRoute);


const PORT = process.env.PORT || 5001;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))