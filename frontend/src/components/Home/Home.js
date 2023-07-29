import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData/MetaData";
import "./home.css";
import ProductCard from "./ProductCard";
import { clearErrors, getAllProducts } from "../../redux/Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// const product = {
//   name: "Blue Tshirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "₹1500",
//   _id: "ajfuturistic",
// };
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [error, alert, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecom || Find Amazing Products" />

          <div className="banner">
            <p>Welcome to Ecom</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <section className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
