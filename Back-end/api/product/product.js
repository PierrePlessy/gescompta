const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/all', (req, res) => {
    Product.find({
            deleted: false
        })
        .then((products) => {
            res.json(products);
        });
});

router.get('/:id', (req, res) => {
    Product.find({
            id: req.params.id,
            deleted: false
        })
        .then((product) => {
            if (product)
                res.json(product)
            else
                res.json({
                    success: false,
                    message: 'Can\'t find product !'
                })
        });
});

router.post('/create', (req, res) => {

    const new_product = new Product({
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

    new_product.save()
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

router.post('/update', (req, res) => {
    Product.find({
        name: req.body.name,
        deleted: false
    })
    .update({}, req.body, {
        runValidators: true
    })
    .catch((err) => {
        res.json({
            success: false,
            message: 'Can\'t update product !'
        })
    })
});

router.delete('/delete', (req, res) => {
    Product.find({
            name: req.body.name
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
                    message: 'Product deleted !'
                });
            }
        })
});

module.exports = router;
