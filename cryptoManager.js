const NodeRSA = require('node-rsa');
const md5 = require('md5');

const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n' +
    'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n' +
    'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n' +
    'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n' +
    'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n' +
    'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n' +
    'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n' +
    '-----END RSA PRIVATE KEY-----');

module.exports = {
    encryptText: function(text) {
        return key.encrypt(text, 'base64');
    },
    generateUserId: function() {
        return md5(Date.now());
    },
    encryptPassword: function(pass) {
        return md5(pass);
    },
}