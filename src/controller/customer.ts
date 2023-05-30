import express from 'express';
import prisma from '../../prisma/prisma';

export const addCustomer = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { nama, alamat, no_hp } = req.body;

      if (!nama || !alamat || !no_hp) {
         return res.sendStatus(400);
      }

      const addCustomer = await prisma.pelanggan.create({
         data: {
            nama,
            alamat,
            no_hp,
         },
      });

      return res.status(200).json(addCustomer).end();
   } catch (error) {
      console.log('gagal menambah data customer : ' + error);
      return res.sendStatus(400);
   }
};

export const getAllCustomers = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const dataCostumers = await prisma.pelanggan.findMany();

      return res.status(200).json(dataCostumers).end();
   } catch (error) {
      console.log('gagal mendapatkan data customer : ' + error);
      return res.sendStatus(400);
   }
};

export const deleteCustomer = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;

      if (!id) {
         return res.sendStatus(400);
      }

      const deleteCustomer = await prisma.pelanggan.delete({
         where: {
            id: Number(id),
         },
      });

      return res.status(200).json(deleteCustomer).end();
   } catch (error) {
      console.log('gagal menghapus data customer : ' + error);
      return res.sendStatus(400);
   }
};

export const UpdateCustomer = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { id } = req.params;
      const { nama, alamat, no_hp } = req.body;

      if (!id || !nama || !alamat || !no_hp) {
         return res.sendStatus(400);
      }

      const updateCustomer = await prisma.pelanggan.update({
         where: {
            id: Number(id),
         },
         data: {
            nama,
            alamat,
            no_hp,
         },
      });

      return res.status(200).json(updateCustomer).end();
   } catch (error) {
      console.log('gagal edit data customer : ' + error);
      return res.sendStatus(400);
   }
};
