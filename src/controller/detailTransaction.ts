import express from 'express';
import prisma from '../../prisma/prisma';

export const addDetailTransaction = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const transactions: [] = req.body;

      if (!transactions) {
         return res.sendStatus(400);
      }

      /* const addDetailTransaction = await prisma.detail_transaksi.createMany({
         data: transactions,
      }); */

      transactions.map(async (transaksi: any, index) => {
         await prisma.detail_transaksi.create({
            data: {
               id_transaksi: transaksi.id_transaksi,
               id_produk: transaksi.id_produk,
               jumlah: transaksi.jumlah,
               total_harga: transaksi.total_harga,
            },
         });

         const currentStock = await prisma.produk.findFirst({
            where: {
               id: transaksi.id_produk,
            },
            select: {
               stok: true,
            },
         });
         //update stok
         await prisma.produk.update({
            data: {
               stok: currentStock.stok - transaksi.jumlah,
            },
            where: {
               id: transaksi.id_produk,
            },
         });
      });

      return res.sendStatus(200);
   } catch (error) {
      console.log('gagal menambahkan data transaksi : ' + error);
      res.sendStatus(400);
   }
};
