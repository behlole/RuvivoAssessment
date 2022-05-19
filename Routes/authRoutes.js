const response = require("../Utils/Response");
const authController = require("../Controller/AuthController");
const router = require('express').Router();
const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'users/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + path.extname(file.originalname)) //Appending extension
    }
})

let upload = multer({storage: storage});


router.get('/', (req, res) => {
    res.send(response.successResponse([], "Auth is running"))
})
router.post('/register', upload.single('file'), authController.signUp);
router.post('/login', authController.signIn);

module.exports = router;
