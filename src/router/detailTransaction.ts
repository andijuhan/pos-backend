import express from 'express';
import { addDetailTransaction } from '../controller/detailTransaction';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
   router.post('/detail-transaction', isAuthenticated, addDetailTransaction);
};
