import express from 'express'
import { addToCart, getUserCart,updateQuantity } from '../controllers/cartcontroller.js'
import authuser from '../middleware/auth.js'
const cartRouter = express.Router()

cartRouter.post('/add',authuser, addToCart)
cartRouter.post('/get',authuser, getUserCart)
cartRouter.post('/update',authuser, updateQuantity)

export default cartRouter 