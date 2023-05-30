import express from 'express';
import {
   addCustomer,
   getAllCustomers,
   deleteCustomer,
   UpdateCustomer,
} from '../controller/customer';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
   router.post('/customer', isAuthenticated, addCustomer);
   router.get('/customer', isAuthenticated, getAllCustomers);
   router.delete('/customer/:id', isAuthenticated, deleteCustomer);
   router.patch('/customer/:id', isAuthenticated, UpdateCustomer);
};
