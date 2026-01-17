const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');

const createCategory = asyncHandler(async(req,res)=>{
    try {
        const newCategory = await Category.create(req.body)
        res.json(newCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newCategory = await Category.findByIdAndUpdate(id,req.body,{new:true})
        res.json(newCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newCategory = await Category.findByIdAndDelete(id)
        res.json('Already deleted')
    } catch (error) {
        throw new Error ('Error')
    }
})

const getAllCategory = asyncHandler(async(req,res)=>{
    try {
        const allCategory = await Category.find()
        res.json(allCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

const getCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const allCategory = await Category.findById(id)
        res.json(allCategory)
    } catch (error) {
        throw new Error ('Error')
    }
})

module.exports = {createCategory, updateCategory, deleteCategory, getAllCategory, getCategory}