const router = require('express').Router();
const controller = require('./controller');
const {authendicate} = require('../../middleware/auth')

router.get('/', controller.find);
router.get('/me', authendicate, controller.me);
router.get('/meWithModels',authendicate, controller.meWithModels);
router.get('/:id',controller.findById);

router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/me', authendicate, controller.updateMe);

module.exports = router;
