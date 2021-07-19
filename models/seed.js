const mongoose = require('mongoose');
const Post = require('./post');

mongoose
    .connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connection Open!'))
    .catch((err) => console.log('MongoDB Connection Failed..', err));

const blogs = [
    {
        title: 'My First Post',
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugit sed molestias consequatur doloremque iure ipsam id, voluptas aliquam voluptate odit, animi alias repudiandae eum aut architecto veritatis dolor est.',
    },
    {
        title: 'My Second Post',
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugit sed molestias consequatur doloremque iure ipsam id, voluptas aliquam voluptate odit, animi alias repudiandae eum aut architecto veritatis dolor est.',
    },
    {
        title: 'My Third Post',
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugit sed molestias consequatur doloremque iure ipsam id, voluptas aliquam voluptate odit, animi alias repudiandae eum aut architecto veritatis dolor est.',
    },
];

Post.insertMany(blogs)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
