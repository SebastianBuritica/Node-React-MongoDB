const express = require('express');
const router = express.Router();

// Import the model
const BlogModel = require('../models/blog');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        // Find and return all blogs from the database
        const blogs = await BlogModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get a single blog
router.get('/:id', async (req, res) => {
    try {
        // Find a single blog with the given id
        const blog = await BlogModel.findById(req.params.id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create a new blog
router.post('/', async (req, res) => {
    const blog = new BlogModel({
        title: req.body.title,
        content: req.body.content
    })
    try {
        const newBlog = await blog.save()
        res.status(201).json(newBlog)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Update a blog
// router.patch('/:id', async (req, res) => {
    
//     const _id = req.params.id
    
//     if (req.body.title != null) {
//         res.blog.title = req.body.title
//     }
//     if (req.body.content != null) {
//         res.blog.content = req.body.content
//     }
//     try {
//         const updatedBlog = await res.blog.save()
//         res.status(200).json(updatedBlog)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// Delete a blog
router.delete('/:id', async (req, res) => {
    

    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Blog deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Middleware for getting a blog by id 
// async function getBlogById(req, res, next) {
    
//     const _id = req.params.id

//     try {
//         const blog = await BlogModel.findByOne(_id)
        
//         if (blog == null) {
//             return res.status(404).json({message: 'Cannot find blog'})
//         } 
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }

//     res.blog = blog
//     next()
// }

// import express from 'express'
// import { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/BlogController.js'
// const router = express.Router()

// router.get('/', getAllBlogs)
// router.get('/:id', getBlog)
// router.post('/', createBlog)
// router.put('/:id', updateBlog)
// router.delete('/:id', deleteBlog)

// export default router

module.exports = router;
