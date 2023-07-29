import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./Reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
} from "./Reducers/userReducer";
import { profileReducer } from "./Reducers/profileReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {
  allOrdersReducer,
  manageOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: orderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  manageOrder: manageOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
