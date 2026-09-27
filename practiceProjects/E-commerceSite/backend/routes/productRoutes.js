const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { productRules, productIdRules } = require('../validators/productValidator');
const validate = require('../middleware/validateMiddleware');
const authenticate = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', productIdRules, validate, getProductById);

// Protected write routes
router.post('/', authenticate, productRules, validate, createProduct);
router.put('/:id', authenticate, productIdRules, productRules, validate, updateProduct);
router.delete('/:id', authenticate, productIdRules, validate, deleteProduct);

module.exports = router;
