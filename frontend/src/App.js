import "./App.css";
import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./redux/store";
import { loadUser } from "./redux/Actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrder from "./components/Order/MyOrder";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList/ProductList";
import NewProduct from "./components/Admin/CreateProduct/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct";
import OrderList from "./components/Admin/Orders/OrderList";
import ProcessOrder from "./components/Admin/Orders/ProcessOrder";
import UserList from "./components/Admin/User/UserList";
import UpdateUser from "./components/Admin/User/UpdateUser";
import ProductReviews from "./components/Admin/Reviews/ProductReviews";
import AboutUs from "./components/About/AboutUs";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");

    // console.log(data);
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getApiKey();
  }, []);
  return (
    <Router>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />

        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/Cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        {/* ADMIN ROUTES */}

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UserList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
