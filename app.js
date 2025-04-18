const express = require('express');
const app = express();
const productRoutes = require('./API/routes/productRoutes');
const storeRoutes = require('./API/routes/storeRoutes');
const stockDemandRoutes = require('./API/routes/stockDemandRoutes');
const statsRoutes = require('./API/routes/statsRoutes');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);
app.use('/stock-demands', stockDemandRoutes);
app.use('/stats', statsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});