const Branch = require('../models/branchModel');
const asyncHandler = require('express-async-handler');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');

const createBranch = asyncHandler(async(req,res)=>{
    try {
        const newBranch = await Branch.create(req.body)
        res.json(newBranch)
    } catch (error) {
        throw new Error ('Error')
    }
})

const updateBranch = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newBranch = await Branch.findByIdAndUpdate(id,req.body,{new:true})
        res.json(newBranch)
    } catch (error) {
        throw new Error ('Error')
    }
})

const deleteBranch = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const newBranch = await Branch.findByIdAndDelete(id)
        res.json('Already deleted')
    } catch (error) {
        throw new Error ('Error')
    }
})

const getAllBranch = asyncHandler(async(req,res)=>{
    try {
        const allBranch = await Branch.find()
        res.json(allBranch)
    } catch (error) {
        throw new Error ('Error')
    }
})

const getBranch = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const allBranch = await Branch.findById(id)
        res.json(allBranch)
    } catch (error) {
        throw new Error ('Error')
    }
})

module.exports = {createBranch, updateBranch, deleteBranch, getAllBranch, getBranch}