const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, autorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, autorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, autorizedRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, autorizedRoles("admin"), deleteOrder);

module.exports = router;
