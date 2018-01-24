const router = require('express').Router();
const Command = require('../../models/Command');
const User = require('../../models/User');

router.get('/', (req, res) => {
    Command.find({
            _id: req.user.command,
            deleted: false
        })
        .populate('user')
        .populate('product')
        .then((command) => {
            if (command) {
                res.json(command)
            } else {
                res.json({
                    success: false,
                    message: 'Can\'t find command !'
                })
            }
        });
});

router.get('/:id', (req, res) => {
    Command.find({
            _id: req.params.id,
            deleted: false
        })
        .populate('user')
        .populate('product')
        .then((command) => {
            if (command) {
                res.json(command)
            } else {
                res.json({
                    success: false,
                    message: 'Can\'t find command !'
                })
            }
        });
});

router.post('/create', (req, res) => {

    const new_command = new Command({
        user: req.user._id
    });

    new_command.save()
        .then(() => {
            res.json({
                success: true,
                message: 'Command created !'
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'Can\'t create command !'
            });
        })

});

router.post('/addProduct/:pid', (req, res) => {
    Command.findOne({
            _id: req.user.command,
            deleted: false
        })
        .then((command) => {
            command.product.push(req.params.pid)
            return command.update({
                $set: {
                    product: command.product,
                }
            })
        })
        .then(() => {
            res.json({
                success: true,
                message: 'Product add to the command !'
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'Can\'t add product to the command !' + err
            })
        })
});

router.post('/deleteProduct/:pid', (req, res) => {
    Command.findOne({
            _id: req.user.command,
            deleted: false
        })
        .then((command) => {
            command.product.forEach((id) => {
                if (id == req.params.pid) {
                    // delete id;
                    command.product.splice(command.product.indexOf(id),1)
                    return
                }
            })

            return command.update({
                $set: {
                    product: command.product,
                }
            })
        })
        .then(() => {
            res.json({
                success: true,
                message: 'Product delete to the command !'
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                message: 'Can\'t delete product to the command !' + err
            })
        })
});

router.delete('/delete/:id', (req, res) => {
    Command.find({
            _id: req.params.id
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
                    message: 'Command deleted !'
                });
            }
        })
});

router.delete('/delete', (req, res) => {
    Command.find({
            _id: req.user.command
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
                    message: 'Command deleted !'
                });
            }
        })
});

module.exports = router;
