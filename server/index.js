import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8080;
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.send({ message: 'Welcome to real estate server' }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(port, () => console.log(`Server is running on PORT ${port}`));
	} catch (error) {
		console.log(error);
	}
};

startServer();
