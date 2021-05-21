const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/posts.controller');

//Multer Destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//POST Blog
router.post('/create', upload.single('postImage'), blogController.postBlog);

//GET all Blog Details
router.get('/', blogController.allBlogDetails);

//GET Blog by ID
router.get('/blog/:id', blogController.blogDetails);

//DELETE Blog by ID
router.delete('/delete/:id', blogController.deleteBlog);

//PATCH blog by ID

router.put(
  '/update/:id',
  upload.single('postImage'),
  blogController.updateBlog
);

module.exports = router;
