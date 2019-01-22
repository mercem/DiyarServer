const router = require('express').Router();
const controller = require('./controller');

router.get('/', (req, res, next) => {
  res.send('This is model response.');
});

module.exports = router;
