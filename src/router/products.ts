import express from 'express';
import {
   addProduct,
   getAllProducts,
   updateProduct,
   deleteProduct,
} from '../controller/products';
import { isAuthenticated, isOwnerOrAdmin } from '../middlewares';

export default (router: express.Router) => {
   router.get('/products', isAuthenticated, isOwnerOrAdmin, getAllProducts);
   router.post('/products', isAuthenticated, isOwnerOrAdmin, addProduct);
   router.patch(
      '/products/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      updateProduct
   );
   router.delete(
      '/products/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      deleteProduct
   );
};
