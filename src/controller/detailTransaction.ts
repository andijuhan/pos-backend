import express from 'express';
import prisma from '../../prisma/prisma';

export const addDetailTransaction = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const transactions = req.body;

      if (!transactions) {
         return res.sendStatus(400);
      }

      const addDetailTransaction = await prisma.detail_transaksi.createMany({
         data: transactions,
      });

      return res.status(200).json(addDetailTransaction).end();
   } catch (error) {
      console.log('gagal menambahkan data transaksi : ' + error);
      res.sendStatus(400);
   }
};
