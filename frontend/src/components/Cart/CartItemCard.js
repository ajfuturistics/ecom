import React from "react";
import { Link } from "react-router-dom";
import "./cartItemCard.css";

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="cartItemCard">
      <img src={item.image} alt="sss" />
      <div className="">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
