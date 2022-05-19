const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authRoutes = require('../Routes/authRoutes');
const postRoutes = require('../Routes/postRoutes');
const response = require('../Utils/Response')

/**
 * Entry Route
 */
router.get('/', (req, res) => {
    res.send(response.successResponse([], "App is running"))
});

router.use('/auth', authRoutes);
router.use('/posts', verifyToken, postRoutes);
/**
 * Wildcard route
 */
router.get('/**', (req, res) => {
    res.send(response.errorResponse("Invalid Route name"))
})

module.exports = router;

/**
 * Authorization middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.send(response.errorResponse("Unauthorized Request"))
        }

        let token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.send(response.errorResponse("Unauthorized Request"))
        }

        let payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            return res.send(response.errorResponse("Unauthorized Request"))
        }
        req.user_email = payload.email;

        next();
    } catch (e) {
        return res.status(401).send({message: e.message});
    }
}
