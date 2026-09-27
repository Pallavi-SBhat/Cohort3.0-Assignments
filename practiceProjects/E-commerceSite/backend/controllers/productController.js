const Product = require('../models/Product');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Authenticated
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category,
      imageUrl: imageUrl || undefined,
      createdBy: req.user._id,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: product.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error creating product',
      error: error.message,
    });
  }
};

/**
 * @desc    List all products with optional search, category, and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNum) || 1,
      currentPage: pageNum,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching products',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching product details',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Authenticated
 */
const updateProduct = async (req, res) => {
  try {
    // Confirm product exists first
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Cannot update. Product not found with ID ${req.params.id}`,
      });
    }

    const { name, description, price, stock, category, imageUrl } = req.body;

    product.name = name !== undefined ? name : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.stock = stock !== undefined ? parseInt(stock, 10) : product.stock;
    product.category = category !== undefined ? category : product.category;
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: product.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error updating product',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Authenticated
 */
const deleteProduct = async (req, res) => {
  try {
    // Confirm product exists first
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Cannot delete. Product not found with ID ${req.params.id}`,
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedId: req.params.id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error deleting product',
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
