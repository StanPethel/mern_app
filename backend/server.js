require("dotenv").config();
const express = require('express');
const cors = require('cors')
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/users")
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
  
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)


const PORT = process.env.PORT || 5001;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))