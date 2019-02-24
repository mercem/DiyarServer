const router = require('express').Router();
const controller = require('./controller');
const {authendicate} = require('../../middleware/auth');

router.post('/', authendicate, controller.create);
router.get('/', controller.all);
router.get('/me', authendicate, controller.me);
router.post('/update', authendicate, controller.update);

module.exports = router;
