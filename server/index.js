import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => res.send({ message: 'Welcome to real estate server' }));

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => console.log(`Server is running on PORT ${port}`));
