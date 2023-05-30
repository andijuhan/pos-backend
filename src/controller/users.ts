import express from 'express';
import prisma from '../../prisma/prisma';
import { hashPassword } from '../helpers';

export const getAllUsers = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const users = await prisma.pengguna.findMany({
         select: {
            username: true,
            email: true,
            role: true,
         },
      });

      return res.status(200).json(users).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};

export const deleteUser = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;

      await prisma.pengguna.delete({
         where: {
            id: Number(id),
         },
      });

      return res.status(200).json({ message: 'berhasil delete user' }).end();
   } catch (error) {
      console.log('gagal menghapus user : ' + error);
      return res.sendStatus(400);
   }
};

export const addUser = async (req: express.Request, res: express.Response) => {
   try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password || !role) {
         return res.sendStatus(400);
      }

      const addUser = await prisma.pengguna.create({
         data: {
            username,
            email,
            password: await hashPassword(password),
            role,
         },
      });

      return res.status(200).json(addUser).end();
   } catch (error) {
      console.log('gagal menambahkan user : ' + error);
      return res.sendStatus(400);
   }
};

export const updateUser = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;
      const { username, email, password, role } = req.body;

      if (!username || !email || !password || !role) {
         return res.sendStatus(400);
      }

      const updateUser = await prisma.pengguna.update({
         where: {
            id: Number(id),
         },
         data: {
            username,
            email,
            password: await hashPassword(password),
            role,
         },
      });

      return res.status(200).json(updateUser).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};
