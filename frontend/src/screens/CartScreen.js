import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import CartItem from "../components/CartItem";
import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import StripeCheckout from "react-stripe-checkout";
//import { useNavigate } from "react-router";
//import { userRequest } from "../requestMethods";

//const KEY = process.env.REACT_APP_STRIPE;

// Components


// Actions


const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  //const [stripeToken, setStripeToken] = useState(null);
  const { cartItems } = cart;
  //const navigate = useNavigate();

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: 500,
  //       });
  //       navigate.push("/success", {
  //         stripeData: res.data,
  //         products: cart, });
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, navigate]);

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <Link to ='/pay'>
            <button>Proceed To Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;