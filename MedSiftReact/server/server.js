//Please excuse the mess in here! Alot of this will be moved into seperate router files...
//this is just for testing formatting 
import { connectDB } from '../database/db.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = express();
const port = process.env.PORT || 3000;
import indexRouter from './routes/index.js';
import seedDatabase from '../database/seed.js';


server.use(cors());
server.use(morgan('combined'));
server.use(express.json());

server.use('/api', indexRouter);

server.use(express.static(path.join(__dirname, '../dist')));

// Catch-all so React Router handles client-side navigation
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// seedDatabase(client, 'Users');

server.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port}`);
  console.log(`Connection to server successful`);
});