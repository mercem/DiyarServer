const router = require('express').Router();
const controller = require('./controller');
const {authendicate} = require('../../middleware/auth');


router.put('/', authendicate, controller.create); // For amazon s3. Cant send post req

router.get('/', controller.all);
router.get('/mine', authendicate, controller.mine);
router.get('/categories', controller.categories);
router.get('/:id', controller.findById);

router.post('/', authendicate, controller.create);
router.post('/update', authendicate, controller.update);

router.delete('/:id', authendicate, controller.deleteById);

module.exports = router;
