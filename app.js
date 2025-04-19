const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const productRoutes = require('./API/routes/productRoutes');
const storeRoutes = require('./API/routes/storeRoutes');
const stockDemandRoutes = require('./API/routes/stockDemandRoutes');
const statsRoutes = require('./API/routes/statsRoutes');
const authRoutes = require('./API/routes/authRoutes');
const { authenticate, requireAuth, requireUserType } = require('./API/middleware/authMiddleware');

app.use(express.json());
app.use(cookieParser());
app.use(authenticate);

// Public routes
app.use('/auth', authRoutes);

// Protected routes with different access levels
app.use('/products', requireAuth, productRoutes);
app.use('/stores', requireAuth, storeRoutes);

// Stock management (FREE_TRIAL and BUSINESS)
app.use('/stock-demands', requireAuth, requireUserType(['FREE_TRIAL', 'BASIC', 'PREMIUM', 'BUSINESS']), stockDemandRoutes);

// Stats routes with different access levels
app.use('/stats/basic', requireAuth, requireUserType(['BASIC', 'PREMIUM', 'BUSINESS']), statsRoutes);
app.use('/stats/predictions', requireAuth, requireUserType(['PREMIUM', 'BUSINESS']), statsRoutes);
app.use('/stats/recommendations', requireAuth, requireUserType(['BUSINESS']), statsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});