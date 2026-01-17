const asyncHandler = require('express-async-handler');
const productService = require('../services/productService');
const {
    CreateProductDTO,
    ProductResponseDTO
} = require('../dtos/product.dto');

const {
    successResponse
} = require('../utils/helpers/responseHelpers');

const createProduct = asyncHandler(async (req, res) => {
    const dto = new CreateProductDTO(req.body);
    const product = await productService.createProduct(dto);
    return successResponse(
        res,
        new ProductResponseDTO(product),
        201
    );
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    return successResponse(
        res,
        new ProductResponseDTO(product)
    );
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts(req.query);
    const result = products.map(p => new ProductResponseDTO(p));
    return successResponse(res, result);
});

const getPublicProducts = async ({ limit = 9, cursor }) => {
  const query = cursor
    ? { createdAt: { $lt: cursor } }
    : {};

  return Product.find(query)
    .sort({ createdAt: -1 })
    .limit(Number(limit));
};

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    getPublicProducts
};
