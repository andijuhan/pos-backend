import express from 'express';
import { addTransaction } from '../controller/transaction';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
   router.post('/transaction', isAuthenticated, addTransaction);
};
