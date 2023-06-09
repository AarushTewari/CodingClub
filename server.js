const express = require('express')
const app = express()
const blogRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const blogs = await Blog.find().sort({
        createdAt: 'desc'
    })

    res.render('blogs/index', { blogs: blogs })
})

app.use('/blogs', blogRouter)

app.listen(5000)