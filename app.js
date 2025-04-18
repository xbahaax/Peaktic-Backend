const express = require('express');
const app = express();
const productRoutes = require('./API/routes/productRoutes');
const storeRoutes = require('./API/routes/storeRoutes');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});