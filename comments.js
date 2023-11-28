// Create web server to handle comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import models
const Comments = require('../models/comments');

// Create router
const commentRouter = express.Router();

// Use body-parser
commentRouter.use(bodyParser.json());

// Configure router
commentRouter.route('/')
    // Return all comments
    .get((req, res, next) => {
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Add new comment
    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created: ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Update all comments
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    // Delete all comments
    .delete((req, res, next) => {
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

// Configure router
commentRouter.route('/:commentId')
    // Return comment with given id
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Add new comment with given id
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /comments/' + req.params.commentId);
    })
    //