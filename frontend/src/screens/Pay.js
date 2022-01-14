import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const KEY= process.env.REACT_APP_STRIPE;

const Pay = () =>{
  const [stripeToken, setStripeToken]= useState(null)
  const navigate = useNavigate(); navigate("/success");
  const cart = useSelector((state) => state.cart);

  const onToken =(token)=>{
    setStripeToken(token);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate.push("/success", {
          stripeData: res.data,
          products: cart, });
           
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);


    return(
        <div
         style={{
             height: "100vh",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
          }}
         >
           {stripeToken ? (
              navigate("/success")
            ) :(
          <StripeCheckout 
              name="MERN Shop"
              image="https://www.popsci.com/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
          >   
            <button
              style={{
                  border: "none",
                  width: 120,
                  borderRadius: 5,
                  padding: "20px",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
              }}
            >
            Pay Now
            </button>
          </StripeCheckout>
          )}
        </div>
    );
};
export default Pay;