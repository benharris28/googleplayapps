const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { sort, genre = ""} = req.query;

    
    
    // sort must be 'rating' or 'app'
    //Validate they entered the right sort parameter
    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                    .status(400)
                    .send('Sort must be rating or app');
        }
    }

    if(genre) {
        if(!['action', 'puzzle', 'strategy', 'arcade', 'card'].includes(genre)) {
            return res
                    .status(400)
                    .send('Genre must be one of action, puzzle, strategy, arcade, or card');
    }
}

   // let results = apps;
                   
    let results = apps
                    .filter(app => 
                        app
                        .Genres
                        .toLowerCase()
                        .includes(genre.toLowerCase()));   
    
    
    if(sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort]? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }
                            
    res
        .json(results);
});

module.exports = app;