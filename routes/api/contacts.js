const express = require('express');
const router = express.Router();

// Contact model
const Item = require('../../models/Contact');

// Jos ao:n toteuttaa index.js tiedostossa pitää käyttää app.get('api/contacts'...

//GET api/contacts (reitissä tämä kansio jossa ollaan nyt)
router.get('/', (req, res) => {
    Contact.find()
        .then(contacts => res.json(contacts));
});

//POST api/contacts
router.post('/', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    newContact.save().then(contact => res.json(contact));
});

//DELETE api/contacts/:id
router.delete('/:id', (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => contact.remove()
            .catch(err => res.status(404))
        )

    /*GET single contact
    router.get('/:id', (req, res) => {
                //Löytyykö kyseinen id? palauttaa true tai false:
                const found = contacts.some(contact => contact.id === parseInt(req.params.id));
                if (found) {
                    //Vastataan jsonilla.
                    res.json(contacts.filter(contact => contact.id === parseInt(req.params.id)));
                } else {
                    //Status koodi 400 ja error viesti joka näyttää myös pyydetyn id:n
                    res.status(400).json({ msg: `No contact found with id of ${req.params.id}` })
                }*/
});

module.exports = router;