const express = require('express');
const router = express.Router();
const User = require('../models/User').model;
const cryptoManager = require('../cryptoManager');
const jwt = require('jsonwebtoken');

router.get('/', async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});


router.post('/signup', async(req, res) => {
    const check = await User.find({ userName: req.body.userName });

    if (Object.keys(check).length === 0) {
        console.log('New Entry');
    } else {
        console.log('not new');
        res.status(200).json({
            success: false,
            message: 'Bu E-Mail\'e ait üyelik bulunmaktadır'
        });
        return;
    }

    const user = new User({
        userName: req.body.userName,
        password: cryptoManager.encryptPassword(req.body.password),
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({
            success: true,
            message: 'Kayıt Başarılı',
            user: savedUser
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    }


});

router.post('/tokenCheck', async(req, res) => {
    let result
    try {
        result = jwt.verify(req.body.token, 'my private key');
    } catch (error) {
        console.log('Error:' + error)
        res.status(200).json({
            status: false,
            message: error
        })
        return;
    }

    res.status(200).json({
        status: true,
        message: result
    })



});

router.post('/signin', async(req, res) => {
    console.log(req.body);
    if (!req.body.userName || !req.body.password) {
        res.status(200).json({
            success: false,
            message: 'Eksik yada yanlış parametre'
        });
        return;
    }
    const queryResult = await User.find({ userName: req.body.userName });
    if (Object.keys(queryResult).length === 0) {
        res.status(200).json({
            success: false,
            message: 'Kullanıcı yada Şifre hatalı.'
        });
        return;
    }

    if (cryptoManager.encryptPassword(req.body.password) === queryResult[0].password) {
        const token = jwt.sign({
                userId: queryResult[0]._id
            },
            'my private key', {
                expiresIn: '5m'
            }
        );
        res.status(200).json({
            success: true,
            message: 'Giriş Başarılı',
            token: token,
            user: queryResult[0]
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Giriş Başarısız'
        });
    }

});

module.exports = router;