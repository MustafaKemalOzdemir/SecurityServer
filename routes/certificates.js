const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate').model;
const cryptoManager = require('../cryptoManager');
const jwt = require('jsonwebtoken');
const User = require('../models/User').model;

router.get('/', async(req, res) => {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
});

router.post('/store', async(req, res) => {
    if (!req.body.certificate) {
        res.status(200).json({
            success: false,
            message: "Certificate is required"
        });
        return;
    }

    if (!req.body.token) {
        res.status(200).json({
            success: false,
            message: "Token is required, If you dont have, please SignIn to get token"
        });
        return;
    }

    let result
    try {
        result = jwt.verify(req.body.token, 'my private key');
    } catch (error) {
        console.log('Error:' + error)
        res.status(200).json({
            status: false,
            message: 'Access Token is expired or false plese login again'
        })
        return;
    }

    const queryResult = await User.find({ _id: result.userId });

    if (Object.keys(queryResult).length === 0) {
        res.status(200).json({
            success: false,
            message: 'Token Error, Request token again'
        });
        return;
    }

    await Certificate.remove({ userName: queryResult[0].userName })


    const certificate = new Certificate({
        userName: queryResult[0].userName,
        certificate: req.body.certificate,
    });

    try {
        const savedCertificate = await certificate.save();
        res.status(200).json({
            success: true,
            message: 'Kayıt Başarılı',
            user: savedCertificate
        });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    }

});

router.post('/fetch', async(req, res) => {
    if (!req.body.userName) {
        res.status(200).json({
            status: false,
            message: 'Username Required'
        });
        return;
    }

    if (!req.body.token) {
        res.status(200).json({
            success: false,
            message: "Token is required, If you dont have, please SignIn to get token"
        });
        return;
    }

    let result
    try {
        result = jwt.verify(req.body.token, 'my private key');
    } catch (error) {
        console.log('Error:' + error)
        res.status(200).json({
            status: false,
            message: 'Access Token is expired or false plese login again'
        })
        return;
    }


    const queryResult = await Certificate.find({ userName: req.body.userName });

    if (Object.keys(queryResult).length === 0) {
        res.status(200).json({
            success: false,
            message: 'No certificate found.'
        });
        return;
    }

    res.status(200).json({
        success: true,
        certificate: queryResult[0].certificate
    })



});


module.exports = router;