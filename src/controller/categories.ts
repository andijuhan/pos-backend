import express from 'express';
import prisma from '../../prisma/prisma';

export const addCategory = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { categoryName } = req.body;

      if (!categoryName) {
         return res.sendStatus(400);
      }

      const isCategoryExist = await prisma.kategori_produk.findFirst({
         where: {
            nama: categoryName,
         },
      });

      if (isCategoryExist) {
         return res
            .status(400)
            .json({ message: 'nama kategori sudah ada' })
            .end();
      }

      const addCategory = await prisma.kategori_produk.create({
         data: {
            nama: categoryName,
         },
      });

      return res.status(200).json(addCategory);
   } catch (error) {
      console.log('gagal menambahkan kategori : ' + error);
      return res.sendStatus(400);
   }
};

export const getAllCategory = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const categories = await prisma.kategori_produk.findMany();
      return res.status(200).json(categories).end();
   } catch (error) {
      console.log('gagal mendapatkan data kategori : ' + error);
      return res.sendStatus(400);
   }
};

export const updateCategory = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;
      const { categoryName } = req.body;

      if (!id || !categoryName) {
         return res.sendStatus(400);
      }

      const updateCategory = await prisma.kategori_produk.update({
         where: {
            id: Number(id),
         },
         data: {
            nama: categoryName,
         },
      });

      return res.status(200).json(updateCategory).end();
   } catch (error) {
      console.log('gagal mendapatkan data kategori : ' + error);
      return res.sendStatus(400);
   }
};

export const deleteCategory = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;

      if (!id) {
         return res.sendStatus(400);
      }

      const deleteCategory = await prisma.kategori_produk.delete({
         where: {
            id: Number(id),
         },
      });

      return res.status(200).json(deleteCategory).end();
   } catch (error) {
      console.log('gagal menghapus data kategori : ' + error);
      return res.sendStatus(400);
   }
};
