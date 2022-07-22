const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(fileUpload()); // use default options

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('No files were uploaded.');

  const { name, mimetype, size } = req.files.upfile;

  const respondObj = { name, type: mimetype, size };

  console.log(respondObj);
  res.json(respondObj);
});

// Error Handler
app.use((req, res, next) => {
  const error = (new Error('Not Found').status = 404);
  next(error);
});

// Error route
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
