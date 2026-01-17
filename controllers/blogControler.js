const User = require('../models/userModel');
const Blog = require('../models/blogModel')
const asyncHandler = require('express-async-handler');
const validateIDMongo = require('../validatedIDmongoDB/validatedID');

const createBlog = asyncHandler(async(req,res)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error ('Error')
    }
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        
        const newUpdateBLog = await Blog.findByIdAndUpdate(id, req.body, {new:true});
        res.json(newUpdateBLog);
    } catch (error) {
        throw new Error ('Error')
    }   
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const deleteBLog = await Blog.findByIdAndDelete(id)
        res.json('blog already deleted');
    } catch (error) {
        throw new Error ('Error')
    }
})

const getBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateIDMongo(id);
    try {
        const viewBlog = await Blog.findById(id).populate('likes');
        const updateView = await Blog.findByIdAndUpdate(id,{
            $inc: {countView: 1}
        }, {new: true});

        res.json(viewBlog)
    } catch (error) {
        throw new Error ('Error')
    }
})

const getAllBlog = asyncHandler(async(req,res)=>{
    try {
        const allBlog = await Blog.find();
        res.json(allBlog)
    } catch (error) {
        throw new Error ('Error')
    }
})

const likeBLog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validateIDMongo(blogId);
    const blog = await Blog.findById(blogId);             
    const loginUserId = req?.user?._id;                        
    const isLike = blog?.isLiked;                           
    const alreadyDislike = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString()) 
    if(alreadyDislike) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            isDisliked: false,
            $pull: {dislikes: loginUserId}
        },{new: true})
    }
    if(isLike){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {likes: loginUserId},
            isLiked: false,
        },{new: true})
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            isLiked: true,
            $push: {likes: loginUserId}
        }, {new: true})
        res.json(blog)
    }

})

const dislikeBLog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validateIDMongo(blogId);
    const blog = await Blog.findById(blogId);              
    const loginUserId = req?.user?._id;                        
    console.log(loginUserId)
    const isDislike = blog?.isDisliked;                            
    const alreadyLike = blog?.likes?.find((userId) => userId?.toString() === loginUserId?.toString())
    if(alreadyLike) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            isLiked: false,
            $pull: {likes: loginUserId}
        },{new: true})
    }
    if(isDislike){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull: {dislikes: loginUserId},
            isDisliked: false,
        },{new: true})
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            isDisliked: true,
            $push: {dislikes: loginUserId}
        }, {new: true})
        res.json(blog)
    }

})

module.exports = {createBlog, updateBlog, deleteBlog, getBlog, getAllBlog, likeBLog, dislikeBLog}