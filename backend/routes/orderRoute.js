import express from "express"

import authUser from "../middleware/auth.js"
import adminAuth from "../middleware/adminAuth.js"
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  usersOrders,
  updateStatus
} from "../controllers/orderController.js"

const orderRouter  = express.Router();

// Admin Features
orderRouter.post ('/list',adminAuth,allOrders)
orderRouter.post ('/status',adminAuth,updateStatus)
//payment Features 

orderRouter.post ('/place',authUser,placeOrder )
orderRouter.post ('/razorpay',authUser, placeOrderRazorpay)
orderRouter.post ('/stripe',authUser,placeOrderStripe )
// User Feature

orderRouter.post ('/userorders',authUser,usersOrders)
orderRouter.post ('/userOrders',authUser,usersOrders)

export default orderRouter;

