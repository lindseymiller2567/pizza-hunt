const router = require('express').Router();
const {
    addComment,
    removeComment
} = require('../../controllers/comment-controller');

// set up the POST at /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

// set up the DELETE at /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

module.exports = router;