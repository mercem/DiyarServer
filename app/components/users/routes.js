const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.create);
router.get('/', controller.get);

module.exports = router;
