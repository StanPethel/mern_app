import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import jwt_decode from "jwt-decode";
import {Link} from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;

  const currentUser = useSelector((state) => {
    console.log(state?.user);
    return state?.user?.currentUser;
  });

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        let jwt_token = localStorage.getItem("token");
        let _user

        if (jwt_token) {
          _user = jwt_decode(jwt_token);
        }

        const res = await userRequest.post("/orders", {
          userId: currentUser?._id ?? _user._id,
          products: cart.cartItems.map((item) => ({
            productId: item.product,
            quantity: item.qty,
          })),
          ammount: cart.total,
          address: data.billing_details.address,
        });

        setOrderId(res.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    if (!cart || !data ) return;

    createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        <Link to= '/homescreen'>
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
