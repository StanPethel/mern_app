import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { userRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cartActions";

const KEY = process.env.REACT_APP_STRIPE;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
// navigate("/success");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };

  /**
   * @typedef {{cartItems: []}} Cart
   * @param {Cart} cart 
   * @returns Number
   */
  const getCartTotal = (cart) => {
    return cart.cartItems
      .map(({ qty, price }) => qty * price)
      .reduce((acc, ith_total) => {
        acc += ith_total;
        return acc;
      }, 0);
  };

  //ac==6
  //ith_=4
  //opt= acc+it
  // [1,2,3,4,5,6]

  useEffect(() => {
    const makeRequest = async () => {
      try {
        //use the user request to post the checkout
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: getCartTotal(cart),
        });

        navigate("/success", {
          state: {
            stripeData: res.data,
            cart: {...cart,total: getCartTotal(cart)},
          },
        });
        clearCart(dispatch);

      } catch (error) {
        console.error(error);
      }
    };

    //makeRequest only when stripeToken has a value
    if (stripeToken) makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
      )
    </div>
  );
};
export default Pay;
