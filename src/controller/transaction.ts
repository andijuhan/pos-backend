import express from 'express';
import prisma from '../../prisma/prisma';
import { get } from 'lodash';

export const addTransaction = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const currentUserId = get(req, 'identity.id');
      const { sub_total, metode_pembayaran, status } = req.body;

      if (!sub_total || !metode_pembayaran || !status) {
         return res.sendStatus(400);
      }

      const createTransaction = await prisma.transaksi.create({
         data: {
            sub_total,
            metode_pembayaran,
            id_pengguna: currentUserId,
            status,
         },
      });

      return res.status(200).json(createTransaction).end();
   } catch (error) {
      console.log('gagal menambahkan data transaksi : ' + error);
      res.sendStatus(400);
   }
};
