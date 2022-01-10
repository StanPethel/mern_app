//this uses the mongodb mern-cart cluster
//to start this app connect to mongo db cluster by (node backend/server.js)
//open seperate terminal and type (npm run dev)

import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Routes>
        <Route  path="login" element={<Login/>}/>
        <Route  path="register" element={<Register/>}/>
        <Route exact path="/" element={<HomeScreen/>} />
        <Route  path="product/:id" element={<ProductScreen/>} />
        <Route  path="cart" element={<CartScreen/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;