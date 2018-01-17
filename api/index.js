const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/product', passport.authenticate('jwt', {session: false}), require('./product'));

module.exports = router;
