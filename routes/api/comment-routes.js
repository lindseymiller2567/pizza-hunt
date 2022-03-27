const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// set up the POST at /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

// set up the PUT and DELETE at /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// set up the DELETE reply at /api/comments/:pizzaId/:commentId/:replyId
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply)

module.exports = router;