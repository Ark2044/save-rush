"use client";

import userService from "./userService";
import cartService from "./cartService";
import orderService from "./orderService";
import inventoryService from "./inventoryService";
import deliveryService from "./deliveryService";
import couponService from "./couponService";
import addressService from "./addressService";
import paymentService from "./paymentService";
import authService from "./authService";

// Export all services
export {
  userService,
  cartService,
  orderService,
  inventoryService,
  deliveryService,
  couponService,
  addressService,
  paymentService,
  authService,
};

// Export a default object with all services for convenience
const services = {
  user: userService,
  cart: cartService,
  order: orderService,
  inventory: inventoryService,
  delivery: deliveryService,
  coupon: couponService,
  address: addressService,
  payment: paymentService,
  auth: authService,
};

export default services;
