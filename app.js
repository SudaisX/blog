const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

// const posts = [];
const Post = require('./models/post.js');

const app = express();

// MongoDB Connection
mongoose
    .connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connection Open!'))
    .catch((err) => console.log('MongoDB Connection Failed..', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public')); // public folder

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('home', { posts });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', async (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.post,
    };

    const newPost = new Post(post);
    await newPost.save();

    res.redirect('/');
});

app.post('/posts/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Post.findOneAndDelete({ _id: id });
    res.redirect('/');
});

app.post('/posts/:id/edit', async (req, res) => {
    const { id } = req.params;
    const post = await Post.find({ _id: id });
    res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.find({ _id: id });
    console.log(post[0]);
    if (post) {
        res.render('post', { post: post[0] });
    } else {
        res.render('error');
    }
});

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(3000, () => console.log('server started on port 3000'));
