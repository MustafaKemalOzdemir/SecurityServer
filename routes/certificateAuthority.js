const express = require('express');
const router = express.Router();
const nodeRsa = require('node-rsa');

const key = new nodeRsa('-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n' +
    'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n' +
    'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n' +
    'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n' +
    'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n' +
    'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n' +
    'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n' +
    '-----END RSA PRIVATE KEY-----');


var publicKey = key.exportKey('public');
var privateKey = key.exportKey('private');


router.get('/publicKey', (req, res) => {
    res.send({
        publicKey: publicKey
    });

});

router.post('/signCSR', (req, res) => {

    if (!req.body.csr) {
        return res.status(400).send({
            success: 'false',
            message: 'CSR key is required'
        });
    }
    let certifiCate = req.body.csr.substring(35, req.body.csr.length - 33);
    var responseString = key.encrypt(certifiCate, 'base64');
    responseString = "-----BEGIN CERTIFICATE-----" + responseString + "-----END CERTIFICATE-----"
    return res.status(200).send({
        success: 'true',
        csrResponse: responseString
    });

});

router.post('/retrieve', (req, res) => {
    if (!req.body.signedCertificate) {
        return res.status(400).send({
            success: 'false',
            message: 'Enter Key'
        });
    }
    let certifiCate = req.body.signedCertificate.substring(27, req.body.signedCertificate.length - 25);
    var responseString = key.decrypt(certifiCate, 'utf8');
    responseString = "-----BEGIN-----" + responseString + "-----END-----"
    return res.status(200).send({
        success: 'true',
        certificate: responseString
    });
});

module.exports = router;