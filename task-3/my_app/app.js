
const express = require('express');

const https = require('https');

const app = express();

//  the API URL that we want to fetch data from
const API_URL = 'https://official-joke-api.appspot.com/random_joke';


app.get('/api/data', (req, res) => {

  https.get(API_URL, (response) => {
  
    let data = '';

    response.on('data', (chunk) => {
    
      data += chunk;
    });

   
    response.on('end', () => {
      
      res.json(JSON.parse(data));
    });
  }).on('error', (err) => {
  
    res.status(500).json({ error: 'Failed to fetch data' });
  });
});


app.listen(8080, () => console.log('Server listening on port 8080'));