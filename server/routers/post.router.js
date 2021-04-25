const express = require('express');
const PostModel = require('../models/post.model');
const router = express.Router();

router.get('/api/posts', async (req, res) => {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
});

router.delete('/api/posts/', async (req, res) => {
    const deletedPost = await PostModel.deleteOne({ _id: req.body._id });
    if (deletedPost.deletedCount == 0)
    {
        res.status(418).json(deletedPost);
    }
    else if (deletedPost.ok != 1)
    {
        res.status(417).json(deletedPost);
    }
    else
    {
       res.status(200).json(deletedPost);
    }
});

router.post('/api/posts', async (req, res) => {
    const postToSave = {
        user: req.body.user,
        message: req.body.message,
        timestamp: new Date()
    }
    const post = await PostModel.create(postToSave);
    res.status(201).json(post);
});

module.exports = router;