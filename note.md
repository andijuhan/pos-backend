Untuk membuat detail transaksi menggunakan Prisma, Anda perlu menyimpan informasi produk yang terkait dengan transaksi dalam tabel "Detail Transaksi". Berikut adalah contoh lengkap yang mencakup pembuatan transaksi dan detail transaksi menggunakan Prisma:

1. Pastikan Anda telah menginstal Prisma dan mengkonfigurasi koneksi database yang sesuai. Jika belum, ikuti langkah-langkah di awal contoh sebelumnya.

2. Buat file `app.js` dan import Prisma:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

3. Selanjutnya, Anda dapat membuat fungsi untuk membuat transaksi dan detail transaksi:

```javascript
async function createTransaction() {
   try {
      const transaction = await prisma.transaksi.create({
         data: {
            tanggalTransaksi: new Date(),
            totalHarga: 0, // Akan diupdate saat detail transaksi ditambahkan
            metodePembayaran: 'Tunai',
         },
      });

      console.log('Transaksi berhasil dibuat:', transaction);

      const product = await prisma.produk.findUnique({ where: { id: 1 } }); // Ganti dengan ID produk yang ingin ditambahkan ke detail transaksi

      const detailTransaction = await prisma.detailTransaksi.create({
         data: {
            transaksiId: transaction.id,
            produkId: product.id,
            jumlah: 1, // Ganti dengan jumlah produk yang ingin ditambahkan
            subtotal: product.harga, // Ganti dengan harga produk yang ingin ditambahkan
         },
      });

      console.log('Detail transaksi berhasil ditambahkan:', detailTransaction);

      // Mengupdate total harga transaksi berdasarkan subtotal detail transaksi
      const updatedTransaction = await prisma.transaksi.update({
         where: { id: transaction.id },
         data: { totalHarga: detailTransaction.subtotal },
      });

      console.log(
         'Total harga transaksi berhasil diupdate:',
         updatedTransaction
      );
   } catch (error) {
      console.error('Terjadi kesalahan saat membuat transaksi:', error);
   } finally {
      await prisma.$disconnect();
   }
}

createTransaction();
```

4. Jalankan skrip di terminal dengan menggunakan perintah `node app.js`.

Pada contoh di atas, kita menggunakan Prisma Client untuk terhubung ke database dan membuat transaksi baru menggunakan fungsi `create()` pada model `transaksi`. Selanjutnya, kita juga membuat detail transaksi baru menggunakan fungsi `create()` pada model `detailTransaksi`.

Setelah detail transaksi ditambahkan, kita mengupdate total harga transaksi dengan menggunakan fungsi `update()` pada model `transaksi`. Dalam contoh ini, subtotal dari detail transaksi digunakan sebagai total harga transaksi.

Pastikan untuk menyesuaikan kolom dan nilai data yang ingin Anda masukkan ke dalam transaksi dan detail transaksi sesuai dengan desain tabel yang telah Anda buat dalam database.
