import React from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../redux/Actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    let newQuantity = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };
  const decreaseQuantity = (id, quantity) => {
    let newQuantity = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cardContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div className=""></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (accumulator, item) =>
                    accumulator + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div className=""></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
