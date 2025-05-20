import express from 'express'

import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'

import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoute.js'
import hotelRouter from './routes/HotelRoute.js'
import connectCloudinary from './configs/cloudinary.js'
import roomRouter from './routes/roomRoute.js'
import bookingRouter from './routes/bookingRoute.js'


connectDB()
connectCloudinary()
const app=express()

app.use(cors()) // Enable Cross origin


app.use(express.json())

app.use(clerkMiddleware())

//Api to listen to clerk webhook

app.use('/api/clerk',clerkWebhooks)

app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)
app.get('/',(req,res)=>{
    res.send("API is working")
})


const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})