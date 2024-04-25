const dotEnv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

dotEnv.config();

const app = express();

const cors = require('cors');

app.use(express.json());

app.use(cors()); 

const url = process.env.URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

  app.use('/users', userRouter);

  app.use('/admin', adminRouter);
  

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


