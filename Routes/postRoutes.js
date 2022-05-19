const response = require("../Utils/Response");
const postController = require("../Controller/PostController");
const router = require('express').Router();
const multer = require('multer');
const path = require("path");
const jwt = require("jsonwebtoken");


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'posts/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + path.extname(file.originalname)) //Appending extension
    }
})

let upload = multer({storage: storage});


router.get('/', postController.getPosts);
router.get('/delete', postController.deletePost);
router.post('/update', upload.single('file'), postController.updatePost);
router.post('/', upload.single('file'), postController.createPost);

module.exports = router;
