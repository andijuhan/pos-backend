import express from 'express';
import {
   getAllUsers,
   getAllUserDetails,
   deleteUser,
   updateUser,
} from '../controller/users';
import { isAuthenticated, isMyData, isAdmin } from '../middlewares';

export default (router: express.Router) => {
   //user role
   router.get('/users', isAuthenticated, getAllUsers);
   router.delete('/users/:id', isAuthenticated, isMyData, deleteUser);
   router.patch('/users/:id', isAuthenticated, isMyData, updateUser);

   //admin role
   router.get('/admin/users', isAuthenticated, isAdmin, getAllUserDetails);
   router.delete('/admin/users/:id', isAuthenticated, isAdmin, deleteUser);
   router.patch('/admin/users/:id', isAuthenticated, isAdmin, updateUser);
};
