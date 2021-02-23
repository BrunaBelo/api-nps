import 'reflect-metadata'
import "./database"
import express, { request, response } from 'express';
import { router } from './routes';

const app = express()

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running!"));