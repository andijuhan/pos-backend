import express from 'express';
import prisma from '../../prisma/prisma';

export const weeklyReport = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();

      const result = await prisma.transaksi.findMany({
         where: {
            tanggal: {
               gte: startOfWeek,
               lt: endOfWeek,
            },
         },
      });

      return res.status(200).json(result).end();
   } catch (error) {
      console.log('gagal memuat laporan : ' + error);
      return res.sendStatus(400);
   }
};
