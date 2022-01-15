//this uses the mongodb mern-cart cluster
//to start this app connect to mongo db cluster by (node backend/server.js)
//open seperate terminal and type (npm run dev)

import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useSelector } from "react-redux";

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
import Success from "./screens/Success";
import Pay from "./screens/Pay";
import jwt_decode from "jwt-decode";


function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const [user, setUser] = useState(null);
  

  const updateUser = () => {
    let jwt_token = localStorage.getItem("token");

    if (!jwt_token) return;

    let _user = jwt_decode(jwt_token);
    console.log({ _user });

    //dispateUserAction
    setUser(_user);
    
  };

  useEffect(() => {
    updateUser();

    return () => {
      // cleanup;
    };
  }, []);

  //const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="homescreen" element={<HomeScreen />} />
          <Route exact path="/" element={<Register />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="pay" element={<Pay />} />
          <Route path="success" element={<Success />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
