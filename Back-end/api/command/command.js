const router = require('express').Router();
const Command = require('../../models/Command');
const User = require('../../models/User');

router.get('/:id', (req, res) => {
    Command.find({
            id: req.params.id,
            deleted: false
        })
        .then((command) => {
            if (command)
                res.json(command)
            else
                res.json({
                    success: false,
                    message: 'Can\'t find command !'
                })
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
    Command.findById(req.user.command, (err, command) => {
        if (error){
            res.json({
                success: false,
                message: 'Can\'t update command !'
            })
            return
        }
        command.produit.push(req.params.pid)
    })
    .update()
    .catch((err) => {
        res.json({
            success: false,
            message: 'Can\'t add product to the command !'
        })
    })
});

router.post('/deleteProduct/:pid', (req, res) => {
    Command.findById(req.user.command, (err, command) => {
        if (error){
            res.json({
                success: false,
                message: 'Can\'t update command !'
            })
            return
        }
        command.produit.foreach((id) => {
                if( id == req.params.pid) {
                    delete id;
                    return
                }
        })
    })
    .update()
    .catch((err) => {
        res.json({
            success: false,
            message: 'Can\'t delete product to the command !'
        })
    })
});

router.delete('/delete', (req, res) => {
    Command.find({
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
                    message: 'Command deleted !'
                });
            }
        })
});

module.exports = router;
