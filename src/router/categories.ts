import express from 'express';
import {
   addCategory,
   getAllCategory,
   updateCategory,
   deleteCategory,
} from '../controller/categories';
import { isAuthenticated, isOwnerOrAdmin } from '../middlewares';

export default (router: express.Router) => {
   router.get(
      '/admin/categories',
      isAuthenticated,
      isOwnerOrAdmin,
      getAllCategory
   );
   router.post(
      '/admin/categories',
      isAuthenticated,
      isOwnerOrAdmin,
      addCategory
   );
   router.delete(
      '/admin/categories/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      deleteCategory
   );
   router.patch(
      '/admin/categories/:id',
      isAuthenticated,
      isOwnerOrAdmin,
      updateCategory
   );
};
