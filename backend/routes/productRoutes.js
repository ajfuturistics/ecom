const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, autorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, autorizedRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, autorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, autorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, autorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReviews);

module.exports = router;
