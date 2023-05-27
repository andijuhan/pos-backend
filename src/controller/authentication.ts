import express from 'express';
import prisma from '../../prisma/prisma';
import { hashPassword, validatePassword, createSessionToken } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.sendStatus(400);
      }

      const user = await prisma.pengguna.findFirst({
         where: {
            email,
         },
      });

      if (!user) {
         return res.sendStatus(400);
      }

      const isPasswordMatch = await validatePassword(password, user.password);

      if (!isPasswordMatch) {
         console.log(isPasswordMatch);
         return res.sendStatus(403);
      }

      const sessionToken = createSessionToken(email);

      await prisma.pengguna.update({
         where: {
            email,
         },
         data: {
            sessionToken,
         },
      });

      res.cookie('APP-AUTH', sessionToken, {
         domain: 'localhost',
         path: '/',
      });
      return res.status(200).json({ message: 'berhasil login' }).end();
   } catch (error) {
      console.log(error);
   }
};

export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
         return res.sendStatus(400);
      }

      const existingUser = await prisma.pengguna.findFirst({
         where: {
            email: email,
         },
      });

      if (existingUser) {
         return res
            .status(400)
            .json({ message: 'username already exist' })
            .end();
      }

      const user = await prisma.pengguna.create({
         data: {
            username: username,
            email: email,
            password: await hashPassword(password),
            role: 'user',
         },
      });

      return res.status(200).json(user).end();
   } catch (error) {
      console.log(error);
      return res.sendStatus(400);
   }
};
