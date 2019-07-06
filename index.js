const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser')

const contacts = require('./routes/api/contacts')

const path = require('path');
const app = express();

app.use(cors()); //Sallii nyt yhteyden frontendistä
app.use(bodyParser.json());//bodyparser middleware

//Tietokanta
const db = require('./config/keys').mongoURI;

//Yhdistäminen tietokantaan
mongoose.connect(db)
    .then(() => console.log('MongoDB yhdistetty'))
    .catch(err => console.log(err));

//Käytä reittiä
app.use('/api/contacts', contacts);

//env = etsitään environment muuttujia, muuten portti 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`serveri käynnissä portissa ${PORT}`));


/*
Näin tehdään public kansiosta staattinen ja sen html ja css tiedostot toimivat,
jos niitä halutaan käyttää web sivujen tapaan.
app.use(express.static(path.join(__dirname, 'public')));

+ Esimerkkinä tiedoston (html) servaamisesta ilman em. static määritystä--
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

