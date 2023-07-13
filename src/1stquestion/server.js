const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const urlList = Array.isArray(urls) ? urls : [urls];
  const fetchPromises = [];

  urlList.forEach((url) => {
    fetchPromises.push(axios.get(url));
  });

  try {
    const responses = await Promise.allSettled(fetchPromises);

    const numbers = [];

    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        const data = response.value.data;
        if (Array.isArray(data.numbers)) {
          numbers.push(...data.numbers);
        }
      }
    });

    const uniqueNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);

    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
