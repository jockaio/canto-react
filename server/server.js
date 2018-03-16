'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const TranslationHandler = require('./translationHandler');
const translationHandler = new TranslationHandler();
const db = require('./storage');
const Op = db.Sequelize.Op;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
        jwksUri: "https://jhellerstrom.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'http://cantofy.com',
    issuer: "https://jhellerstrom.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/userprofile', authCheck, (req,res) => {
    console.log(JSON.stringify(req.user, null, '  '));
});

app.get('/api/translation', (req, res) => {
    console.log(req.query.queryString);
    let result = translationHandler.translate(req.query.queryString);
    res.json(result);
});

app.get('/api/dbConnection', authCheck, (req, res) => {
    db.Word.sync().then(() => {
      console.log('Word table created.');
    }).catch(() => {
      console.log('Something went wrong yo.')
    });
    res.send();
});

app.get('/api/word', authCheck, (req, res) => {
  console.log(req.query.queryString);
  db.Word.findAll({
    where: {
      item: {
        [Op.like] : '%'+req.query.queryString+'%'
      }
    }
  }).then((word) => {
    res.json(word);
  }).catch((e) => {
    console.log(e);
    res.send();
  });
});


app.listen(3333);
console.log('Listening on localhost:3333');