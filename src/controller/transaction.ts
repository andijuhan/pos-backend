import express from 'express';
import prisma from '../../prisma/prisma';
import { get, map } from 'lodash';

export const addTransaction = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const currentUserId = get(req, 'identity.id');
      const transactions = req.body;

      if (!transactions) {
         return res.sendStatus(400);
      }

      const createPendingTransaction = await prisma.transaksi.create({
         data: {
            id_pengguna: currentUserId,
            status: 'pending',
         },
      });

      const updateIdTransactions = map(transactions, (obj) => ({
         ...obj,
         id_transaksi: createPendingTransaction.id,
      }));

      await prisma.detail_transaksi.createMany({
         data: updateIdTransactions,
      });

      return res.status(200).json(createPendingTransaction).end();
   } catch (error) {
      console.log('gagal menambahkan data transaksi : ' + error);
      res.sendStatus(400);
   }
};
