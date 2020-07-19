var express = require('express');
const app = express();
var bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const certificateRoute = require('./routes/certificates');
const certificateAuthorityRoute = require('./routes/certificateAuthority');
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use('/ca', certificateAuthorityRoute)
app.use('/users', userRoute);
app.use('/certificates', certificateRoute);

app.listen(8000, () => {
    console.log('app listening on port 8000!')
});

mongoose.connect('mongodb://localhost:27017/SecurityDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))