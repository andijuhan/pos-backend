import express from 'express';
import prisma from '../../prisma/prisma';
import { get } from 'lodash';

export const addProduct = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const currentUserId = get(req, 'identity.id');
      const currentUserRole = get(req, 'identity.role');

      const {
         categoryId,
         productName,
         capitalPrice,
         sellingPrice,
         wholeSalePrice,
         stock,
      } = req.body;

      if (!categoryId || !productName || !capitalPrice || !sellingPrice) {
         return res.sendStatus(400);
      }

      const isProductNameExist = await prisma.produk.findFirst({
         where: {
            nama: productName,
         },
      });

      if (isProductNameExist) {
         return res
            .status(400)
            .json({ message: 'Nama produk sudah ada' })
            .end();
      }

      const addProduct = await prisma.produk.create({
         data: {
            id_kategori: categoryId,
            nama: productName,
            harga_modal: capitalPrice,
            harga_jual: sellingPrice,
            harga_grosir: wholeSalePrice,
            stok: stock,
         },
      });

      if (currentUserRole === 'admin') {
         await prisma.logs.create({
            data: {
               id_pengguna: currentUserId,
               aksi: `menambah produk ${productName}`,
            },
         });
      }

      return res.status(200).json(addProduct);
   } catch (error) {
      console.log('gagal menambahkan produk : ' + error);
      res.sendStatus(400);
   }
};

export const getAllProducts = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const products = await prisma.produk.findMany();

      return res.status(200).json(products).end();
   } catch (error) {
      console.log('gagal mendapatkan data produk : ' + error);
      res.sendStatus(400);
   }
};

export const updateProduct = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const currentUserId = get(req, 'identity.id');
      const currentUserRole = get(req, 'identity.role');

      const { id } = req.params;
      const {
         categoryId,
         productName,
         capitalPrice,
         sellingPrice,
         wholeSalePrice,
         stock,
      } = req.body;

      if (
         !id ||
         !categoryId ||
         !productName ||
         !capitalPrice ||
         !sellingPrice
      ) {
         return res.sendStatus(400);
      }

      const updateProduct = await prisma.produk.update({
         where: {
            id: Number(id),
         },
         data: {
            id_kategori: categoryId,
            nama: productName,
            harga_modal: capitalPrice,
            harga_jual: sellingPrice,
            harga_grosir: wholeSalePrice,
            stok: stock,
         },
      });

      if (currentUserRole === 'admin') {
         await prisma.logs.create({
            data: {
               id_pengguna: currentUserId,
               aksi: `update data produk ${productName}`,
            },
         });
      }
      return res.status(200).json(updateProduct).end();
   } catch (error) {
      console.log('gagal update data produk : ' + error);
      res.sendStatus(400);
   }
};

export const deleteProduct = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const currentUserId = get(req, 'identity.id');
      const currentUserRole = get(req, 'identity.role');

      const { id } = req.params;

      if (!id) {
         return res.sendStatus(400);
      }

      const deleteProduct = await prisma.produk.delete({
         where: {
            id: Number(id),
         },
      });

      if (currentUserRole === 'admin') {
         await prisma.logs.create({
            data: {
               id_pengguna: currentUserId,
               aksi: `menghapus produk ${deleteProduct.nama}`,
            },
         });
      }

      return res.status(200).json(deleteProduct).end();
   } catch (error) {
      console.log('gagal menghapus data produk : ' + error);
      res.sendStatus(400);
   }
};
