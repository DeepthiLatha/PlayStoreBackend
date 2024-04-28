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

  app.get('/test', (req, res) => {
    res.json('Test is Working');
  })


  const items = [
    { id: 1, name: 'Item 1', owner: 'Owner A', visibility: 'Public', features: ['Feature 1', 'Feature 2'] },
    { id: 2, name: 'Item 2', owner: 'Owner B', visibility: 'Private', features: ['Feature 2', 'Feature 3'] },
    { id: 3, name: 'Item 3', owner: 'Owner C', visibility: 'Public', features: ['Feature 1', 'Feature 3'] }
  ];
  
  // Endpoint to handle search requests
  app.get('/search', (req, res) => {
    const { owner, visibility, feature } = req.query;
  
    // Filter items based on search criteria
    const filteredItems = items.filter(item => {
      return (!owner || item.owner.toLowerCase().includes(owner.toLowerCase())) &&
             (!visibility || item.visibility.toLowerCase() === visibility.toLowerCase()) &&
             (!feature || item.features.includes(feature));
    });
  
    res.json(filteredItems);
  });

  app.use('/users', userRouter);

  app.use('/admin', adminRouter);
  

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


