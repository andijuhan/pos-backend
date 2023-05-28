import express from 'express';
import { get, merge } from 'lodash';
import prisma from '../../prisma/prisma';
import { validateSessionToken } from '../helpers';

export const isMyData = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const { id } = req.params;
      //membaca id user dari objek identity yg di dambahkan pada middleware isAuthenticated
      const currentUserId = get(req, 'identity.id');

      if (!currentUserId) {
         return res.sendStatus(403);
      }

      if (currentUserId !== Number(id)) {
         return res.sendStatus(403);
      }

      next();
   } catch (error) {
      console.log(error);
   }
};

export const isAdmin = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const currentUserRole = get(req, 'identity.role');

      if (currentUserRole !== 'admin') {
         return res.sendStatus(403);
      }

      next();
   } catch (error) {
      console.log(error);
   }
};

export const isOwnerOrAdmin = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const currentUserRole = get(req, 'identity.role');

      if (currentUserRole === 'user') {
         return res.sendStatus(403);
      }

      next();
   } catch (error) {
      console.log(error);
   }
};

export const isOwner = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const currentUserRole = get(req, 'identity.role');

      if (currentUserRole !== 'owner') {
         return res.sendStatus(403);
      }

      next();
   } catch (error) {
      console.log(error);
   }
};

export const isAuthenticated = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      //mendapatkan sesion token dari cookie browser
      const sessionToken = req.cookies['APP-AUTH'];

      if (!sessionToken) {
         return res.sendStatus(403);
      }

      //cek apakah token sudah expired
      const isSessionTokenValid = validateSessionToken(sessionToken);

      if (!isSessionTokenValid) {
         return res
            .status(403)
            .json({ message: 'session token expired' })
            .end();
      }

      const existingUser = await prisma.pengguna.findFirst({
         where: {
            sessionToken,
         },
      });

      if (!existingUser) {
         return res.sendStatus(403);
      }

      //menambahkan objek identity berisi property existingUser ke dalam objek req
      merge(req, { identity: existingUser });

      return next();
   } catch (error) {
      console.log(error);
   }
};
