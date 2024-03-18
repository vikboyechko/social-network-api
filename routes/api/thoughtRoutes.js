const router = require('express').Router();

// prettier-ignore
const { 
    getThoughts, 
    createThought 
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

module.exports = router;
