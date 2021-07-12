const express = require('express');
const ejs = require('ejs');
const path = require('path');
const _ = require('lodash');

const homeStartingContent = 'Welcome to my Blog.';
const aboutContent =
    'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
    'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const posts = [];

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public')); // public folder

app.get('/', (req, res) => {
    // console.log(posts);

    res.render('home', { posts, _ });
});

app.get('/about', (req, res) => {
    res.render('about', { aboutContent });
});

app.get('/contact', (req, res) => {
    res.render('contact', { contactContent });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.post,
    };

    posts.push(post);
    res.redirect('/');
});

app.get('/posts/:title', (req, res) => {
    // const { title } = req.params;
    let found = false;
    const title = _.lowerCase(req.params.title);
    for (let post of posts) {
        postTitle = _.lowerCase(post.title);
        if (postTitle === title) {
            const { title, content } = post;
            res.render('post', { title, content });
            found = true;
            break;
        }
    }
    if (!found) {
        res.render('error');
    }
});

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(3000, () => console.log('server started on port 3000'));
