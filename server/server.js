'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const TranslationHandler = require('./translationHandler');
const translationHandler = new TranslationHandler();

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

app.get('/api/jokes/food', (req, res) => {
  let foodJokes = [
  {
    id: 99991,
    joke: "When Chuck Norris was a baby, he didn't suck his mother's breast. His mother served him whiskey, straight out of the bottle."
  }
  ];
  res.json(foodJokes);
})

app.get('/api/jokes/celebrity', authCheck, (req,res) => {
  let CelebrityJokes = [
  {
    id: 88881,
    joke: 'As President Roosevelt said: "We have nothing to fear but fear itself. And Chuck Norris."'
  }
  ];
  res.json(CelebrityJokes);
})

app.get('/api/userprofile', authCheck, (req,res) => {
    console.log(JSON.stringify(req.user, null, '  '));
});

app.get('/api/translation', (req, res) => {
    console.log(req.query.queryString);
    let result = translationHandler.translate(req.query.queryString);
    res.json(result);
});
app.listen(3333);
console.log('Listening on localhost:3333');