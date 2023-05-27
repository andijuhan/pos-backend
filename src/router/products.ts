import express from 'express';
import {
   addProduct,
   getAllProducts,
   updateProduct,
   deleteProduct,
} from '../controller/products';
import { isAuthenticated, isOwnerOrAdmin } from '../middlewares';

export default (router: express.Router) => {
   router.get(
      '/admin/products',
      isAuthenticated,
      isOwnerOrAdmin,
      getAllProducts
   );
   router.post('/admin/products', isAuthenticated, isOwnerOrAdmin, addProduct);
   router.patch(
      '/admin/products/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      updateProduct
   );
   router.delete(
      '/admin/products/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      deleteProduct
   );
};
