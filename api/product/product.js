const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/all', (req, res) => {
    Porduct.find({
            deleted: false
        })
        .then((products) => {
            res.json(products);
        });
});

router.get('/:id', (req, res) => {
    Porduct.find({
            id: req.params.id,
            deleted: false
        })
        .then((products) => {
            res.json(products);
        });
});

router.post('/create', (req, res) => {

    const new_porduct = new Product({
        name: req.body.name,
        categories: req.body.categories,
        brand: req.body.brand,
        price: req.body.price,
        memory: req.body.memory,
        hertz: req.body.hertz,
        autonomy: req.body.autonomy,
        os: req.body.os,
        guarantee: req.body.guarantee,
        email: req.body.email,
        address: req.body.address
    });

    new_porduct.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Product created !'
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'Can\'t create product !'
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
