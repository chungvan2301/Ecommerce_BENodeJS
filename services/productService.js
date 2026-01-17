const Product = require('../models/productModel');
const slugify = require('slugify');
const AppError = require('../utils/errors/AppError');

const createProduct = async (data) => {
  if (data.title) {
    data.slug = slugify(data.title, { lower: true });
  }
  return Product.create(data);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

const getAllProducts = async (queryParams) => {
    const queryObj = { ...queryParams };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`
    );

    let query = Product.find(JSON.parse(queryString));

    if (queryParams.sort) {
        query = query.sort(queryParams.sort.split(',').join(' '));
    } else {
        query = query.sort('-createdAt');
    }

    if (queryParams.fields) {
        query = query.select(queryParams.fields.split(',').join(' '));
    }

    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    return query.skip(skip).limit(limit);
};

module.exports = {
    createProduct,
    getProductById,
    getAllProducts
};
