const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>APP IS UP AND RUNNING...</h1>');
});




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`APP is listening at PORT:: ${PORT}`);
});
