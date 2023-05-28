import express from 'express';
import {
   addCategory,
   getAllCategory,
   updateCategory,
   deleteCategory,
} from '../controller/categories';
import { isAuthenticated, isOwnerOrAdmin } from '../middlewares';

export default (router: express.Router) => {
   router.get('/categories', isAuthenticated, isOwnerOrAdmin, getAllCategory);
   router.post('/categories', isAuthenticated, isOwnerOrAdmin, addCategory);
   router.delete(
      '/categories/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      deleteCategory
   );
   router.patch(
      '/categories/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      updateCategory
   );
};
