---
title: Basic Mount Linux
pubDate: 2025-08-29T16:38:27.422Z
description: Cara Mount Pada Server Linux
category: Linux
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Logo/font-logo.png
slug: basic-mount-linux
image: /assets/images/Blog/mount-thumb.jpg
---

# Mount Disk

## **📦 NFS**

![Pic1](/assets/images/Blog/mount3.png)

Tentu, berikut adalah langkah-langkah untuk membuat mount disk permanen (auto-mount) di Linux setelah restart:

### **Identifikasi Disk dan Partisi**

- Gunakan perintah lsblk atau sudo fdisk \-l untuk melihat daftar disk dan partisi yang tersedia.
- Catat nama partisi yang ingin Anda mount, misalnya /dev/sdb1.
- Catat juga UUID partisi tersebut, dengan perintah sudo blkid /dev/sdb1. UUID adalah pengenal unik yang lebih disarankan daripada nama partisi, karena nama partisi bisa berubah.

### **Buat Direktori Mount Point**

- Buat direktori tempat Anda ingin mount partisi tersebut. Misalnya, untuk mount partisi ke direktori /media/data, gunakan perintah:

  ```sh
  sudo mkdir /media/data
  ```

### **Edit File /etc/fstab**

- File /etc/fstab berisi daftar sistem file yang akan di-mount secara otomatis saat boot.
- Buka file /etc/fstab dengan editor teks sebagai root, misalnya:

  ```sh
  sudo nano /etc/fstab
  ```

- Tambahkan baris baru dengan format berikut:

```sh
UUID=<UUID_partisi> <direktori_mount_point> <file_system> <opsi> <dump> <fsck>
```

Contoh:

```sh
UUID=a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6 /media/data ext4 defaults 0 2
```

Penjelasan:

- UUID=<UUID_partisi>: UUID partisi yang ingin di-mount.
- <direktori_mount_point>: Direktori tempat partisi akan di-mount.
- <file_system>: Jenis sistem file (misalnya, ext4, ntfs, vfat).
- <opsi>: Opsi mount (misalnya, defaults, rw, ro).
- <dump>: Untuk utilitas dump (biasanya 0).
- <fsck>: Untuk utilitas fsck (biasanya 0 atau 2).

simpan perubahan yang dilakukan.

### **Mount Partisi**

- Untuk mount partisi tanpa perlu restart, gunakan perintah:

  ```sh
  sudo mount -a
  ```

- Jika tidak ada error, partisi akan di-mount.

### **Verifikasi**

- Gunakan perintah df -h untuk memastikan partisi telah di-mount dengan benar.

 **Catatan Penting**

1.  Pastikan UUID yang Anda gunakan benar.
2.  Pilih opsi mount yang sesuai dengan kebutuhan Anda.
3.  Jika Anda tidak yakin dengan opsi mount, gunakan defaults.
4.  berhati hatilah dalam mengedit file /etc/fstab, kesalahan dalam penulisan sintaks dalam file ini dapat menyebabkan sistem operasi gagal untuk melakukan booting.
5.  Jika Anda ingin mount partisi NTFS, Anda mungkin perlu menginstal paket ntfs-3g.
6.  Jika anda ingin mount partisi yang berada di network, anda perlu menginstall paket tambahan, seperti cifs-utils untuk partisi windows share.

Contoh Mount NFS

```sh
mount -t nfs 192.168.48.6:/export/PVE-BACKUP /mnt/datastore/Pi-NAS
```

/etc/fstab 

```sh
192.168.48.6:/export/PVE-BACKUP /mnt/datastore/Pi-NAS nfs defaults 0 0
```

![mount1](/assets/images/Blog/mount1.png)

Berikut Documentasi config /etc/fstab : 

## **💃🏻 Samba**

Berikut adalah **panduan lengkap untuk mount SMB (Samba) share di sisi client**, terutama pada sistem berbasis Linux (Debian/Ubuntu). Kalau kamu menggunakan OS lain (macOS atau Windows)

---

### ✅  **Pastikan Paket Terinstal**

Instal paket yang dibutuhkan:

```sh
sudo apt update
sudo apt install cifs-utils

```

---

### ✅ **Buat Direktori Mount Point**

Ini adalah folder di mana isi share akan muncul.

```sh
sudo mkdir -p /mnt/smbshare

```

---

### ✅ **Mount Manual (Sekali Jalan)**

Format umum:

```sh
sudo mount -t cifs //IP-ADDRESS/SHARENAME /mnt/smbshare -o username=USERNAME,password=PASSWORD,vers=3.0

```

Contoh:

```sh
sudo mount -t cifs //192.168.1.100/shared /mnt/smbshare -o username=myuser,password=mypassword,vers=3.0

```

Keterangan opsi:

- vers=3.0: Gunakan versi SMBv3.0 (bisa diganti jadi 2.1 atau 1.0 jika server lawas)
- Bisa juga tambahkan domain=WORKGROUP jika dibutuhkan
- Gunakan uid= dan gid= untuk mengatur kepemilikan file

Contoh lebih lengkap:

```sh
sudo mount -t cifs //192.168.1.100/shared /mnt/smbshare -o username=myuser,password=mypassword,uid=1000,gid=1000,vers=3.0

```

---

### ✅  **Automount via /etc/fstab**

Agar mount otomatis saat boot:

Edit file /etc/fstab:

```sh
sudo nano /etc/fstab

```

Tambahkan baris seperti ini:

```sh
//192.168.1.100/shared /mnt/smbshare cifs username=myuser,password=mypassword,uid=1000,gid=1000,vers=3.0 0 0

```

**🛡️ Aman!** Jangan simpan password di fstab. Gunakan file kredensial:

**Contoh alternatif (lebih aman):**

Buat file kredensial:

```sh
sudo nano /etc/smbcredentials

```

Isi file:

```sh
username=myuser
password=mypassword

```

Amankan file:

```sh
sudo chmod 600 /etc/smbcredentials

```

Edit /etc/fstab:

```sh
sudo mount -t cifs //192.168.48.110/MyISO /mnt/Truenas -o credentials=/etc/smb-creds,uid=1000,gid=1000,vers=3.0
```

### 🔧 Cara Cek dari Client (opsional):

Kamu bisa lihat daftar share SMB yang tersedia dari sisi client:

```sh
smbclient -L //192.168.48.110 -U your_username
```

> Ganti your_username sesuai yang ada di file /etc/smb-creds. Kamu akan diminta password.

![](/assets/images/Blog/mount2.png)

Output akan menampilkan daftar share yang bisa diakses. Gunakan nama yang tertulis di situ.

---

### ✅ **Tes Automount**

Setelah edit fstab, tes mount tanpa reboot:

```sh
sudo mount -a

```

Cek apakah share berhasil termount:

```sh
df -h | grep smbshare

```
