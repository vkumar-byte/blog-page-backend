const BlogPost = require('../models/posts.model');
const multer = require('multer');

exports.getAllBlogs = (req, res, next) => {
  try {
    BlogPost.find({}).then((posts) => {
      res.status(200).send(posts);
    });
  } catch (e) {
    console.log(e);
  }
};

//POST story with title,content
exports.postBlog = (req, res, next) => {
  try {
    const blog = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      postImage: req.file.path,
    });

    blog.save((err, blog) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      } else {
        res.json(blog);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

//GET all posts details

exports.allBlogDetails = (req, res, next) => {
  try {
    BlogPost.find()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((err) => {
        res.status(400).json({ success: 0, reason: err.message });
      });
  } catch (e) {
    console.log(e);
  }
};

//GET Employee based on ID
exports.blogDetails = (req, res, next) => {
  try {
    BlogPost.findById(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(400).json({ success: 0, reason: err.message });
      });
  } catch (e) {
    console.log(e);
  }
};

//DELETE Blog based on ID
exports.deleteBlog = (req, res, next) => {
  try {
    BlogPost.findByIdAndDelete(req.params.id)
      .then((post) => {
        if (post) {
          return res.status(201).json({ success: 1, deleted: post });
        }
        return res.status(422).json({
          success: 0,
          reason: "Post ID doesn't exist",
        });
      })
      .catch((err) => {
        res.status(422).json({
          success: 0,
          reason: err.message,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

//UPDATE Blog based on ID
exports.updateBlog = (req, res, next) => {
  try {
    BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        postImage: req.file.path,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
