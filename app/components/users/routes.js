const router = require('express').Router();
const controller = require('./controller');
const {authendicate} = require('../../middleware/auth')

router.post('/', controller.create);
router.get('/', controller.find);
router.post('/login', controller.login);
router.get('/me', authendicate, controller.me);
router.get('/:id',controller.findById);

module.exports = router;
