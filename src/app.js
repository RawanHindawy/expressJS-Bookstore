import mainRoutes from './routes/MainRoutes.js';
import express from 'express';
import 'dotenv/config';
import limiter from './middleware/RateLimiterMiddleware.js';
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(limiter);

app.use('/api', mainRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;