const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.create);
router.get('/', controller.find);
router.get('/:id', controller.findById);

module.exports = router;
