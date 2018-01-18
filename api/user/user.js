const router = require('express').Router();
const hash = require('../../helpers/hash');
const User = require('../../models/User');
const passport = require('passport');

router.get('/all', (req, res) => {
    User.find({
            deleted: false
        })
        .then((users) => {
            res.json(users);
        });
});

router.get('/',/** passport.authenticate('jwt', {
    session: false
}),**/ (req, res) => {
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

router.post('/update', /**passport.authenticate('jwt', {
    session: false
}),**/ (req, res) => {
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

    User.find({
        email: req.user.email,
        deleted: false
    }).update({
        $set: {
            firstname: firstname,
            lastname: lastname,
            password: password
        }
    }, function(err) {
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

router.delete('/delete',/** passport.authenticate('jwt', {
    session: false
}),**/ (req, res) => {
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
