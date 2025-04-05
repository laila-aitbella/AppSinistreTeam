import dotenv from "dotenv";
dotenv.config(); 

import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectTodatabase from './db/db.js'
connectTodatabase()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
