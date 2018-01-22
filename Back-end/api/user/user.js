const router = require('express').Router();
const hash = require('../../helpers/hash');
const User = require('../../models/User');
const Command = require('../../models/Command');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json(req.user);
});

router.post('/register', (req, res) => {

    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        email: req.body.email,
        password: hash.hashPassword(req.body.password),
        address: req.body.address
    });

    const new_command = new Command({
        user: newUser._id,
    })

    newUser.command = new_command._id;

    new_command.save()

    newUser.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Account created !'
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'Can\'t create account !'
            });
        })

});

router.post('/update', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = hash.hashPassword(req.body.password);

    if (!firstname) {
        firstname = req.user.firstname;
    }
    if (!lastname) {
        lastname = req.user.lastname;
    }
    if (!password) {
        password = hash.hashPassword(req.user.password)
    }

    User.findOne({
            email: req.user.email,
            deleted: false
        })
        .update({
            $set: {
                firstname: firstname,
                lastname: lastname,
                password: password
            }
        }, (err) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Account update !'
                });
            }
        });
});

router.delete('/delete', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.find({
            email: req.body.email
        })
        .update({
            $set: {
                deleted: true
            }
        }, (err) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Account softdelete !'
                });
            }
        })
});

module.exports = router;
