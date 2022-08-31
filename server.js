const { query, response } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const element = getRandomElement(quotes);
    const response = { quote: element }
    res.send(response);
})

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const author = req.query.person
        const response = quotes.filter(quote => quote.person == author)
        if (response == []) {
            res.send([])
        } else { res.send({ quotes: response }); }
    } else { res.send({ quotes: quotes }) }
})

app.post('/api/quotes', (req, res, next) => {
    if (req.query.person && req.query.quote) {
        const newQuote = { person: req.query.person, quote: req.query.quote };
        console.log(newQuote);
        quotes.push(newQuote);
        res.status(204).send(newQuote);
    } else {
        res.status(400).send();
    }
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
