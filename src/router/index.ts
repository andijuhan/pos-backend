import express from 'express';
import authentication from './authentication';
import users from './users';
import categories from './categories';
import products from './products';
import transaction from './transaction';
import detailTransaction from './detailTransaction';

const router = express.Router();

export default (): express.Router => {
   authentication(router);
   users(router);
   categories(router);
   products(router);
   transaction(router);
   detailTransaction(router);
   return router;
};
