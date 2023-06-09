const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

blogSchema.pre('validate', function() {
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
})

module.exports = mongoose.model('Blog', blogSchema)