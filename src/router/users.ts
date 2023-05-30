import express from 'express';
import {
   getAllUsers,
   deleteUser,
   updateUser,
   addUser,
} from '../controller/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
   router.post('/users', isAuthenticated, isOwner, addUser);
   router.get('/users', isAuthenticated, isOwner, getAllUsers);
   router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
   router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
