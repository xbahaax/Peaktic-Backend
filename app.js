const express = require('express');
const app = express();
const productRoutes = require('./API/routes/productRoutes');
const storeRoutes = require('./API/routes/storeRoutes');
const stockDemandRoutes = require('./API/routes/stockDemandRoutes'); // Add this line

app.use(express.json());

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);
app.use('/stock-demands', stockDemandRoutes); // Add this line

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});