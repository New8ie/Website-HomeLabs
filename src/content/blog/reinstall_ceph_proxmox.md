---
title: Instalasi Ulang Ceph pada Cluster Proxmox VE
description: Panduan Instalasi Ulang Ceph pada Klaster Proxmox VE
pubDate: 2025-08-29T15:31:13.659Z
category: Virtualisasi
image: /assets/images/Blog/proxmoxve-ceph-single-machine.jpg
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Logo/font-logo.png
---

**Panduan Instalasi Ulang Ceph pada Cluster Proxmox VE**

**PERINGATAN SANGAT PENTING:** Proses instalasi ulang Ceph akan **MENGHAPUS SEMUA DATA** yang ada di OSD (Object Storage Daemon) Ceph yang lama. Pastikan Anda telah mencadangkan semua data penting (VM, kontainer, ISO, backup, dll.) yang tersimpan di storage Ceph sebelum melanjutkan. Proses ini juga akan menyebabkan _downtime_ pada layanan yang bergantung pada Ceph.

**ASUMSI:**

- Klaster Proxmox VE berfungsi (minimal 3 node direkomendasikan).
- Disk khusus untuk OSD Ceph di setiap node.
- Jaringan khusus untuk Ceph (cluster network) sangat direkomendasikan.
- Akses root ke semua node Proxmox VE.
- Proxmox VE ter-update ke versi stabil terbaru.

---

## **Daftar Isi**

1.  **Tahap 1: Persiapan dan Pencadangan**
2.  **Tahap 2: Penghapusan Instalasi Ceph yang Ada**
3.  **Tahap 3: Pembersihan Sisa-sisa Konfigurasi Ceph**
4.  **Tahap 4: Instalasi Ceph Baru**
5.  **Tahap 5: Konfigurasi Ceph Baru**
6.  **Tahap 6: Verifikasi dan Pengujian**
7.  **Tips Tambahan**

---

## **Tahap 1: Persiapan dan Pencadangan**

1.  **Cadangkan Semua Data Penting:**
    - Cadangkan VM dan Kontainer dari storage Ceph ke lokasi lain.
    - Cadangkan konfigurasi Proxmox VE (`/etc/pve/`).
    - Cadangkan data CephFS jika digunakan.
2.  **Identifikasi Disk Ceph:**
    - Catat disk yang digunakan untuk OSD Ceph di setiap node (GUI: `Node -> Ceph -> OSD` atau CLI: `lsblk`, `ceph osd tree`).
3.  **Periksa Kesehatan Klaster Proxmox VE:**
    - Pastikan klaster Proxmox VE sehat, node online dan sinkron.
    - Periksa sinkronisasi waktu (NTP) di semua node:

      ```bash
      systemctl status systemd-timesyncd
      timedatectl

      ```

4.  **Dokumentasikan Konfigurasi Jaringan:**
    - Catat konfigurasi jaringan publik dan klaster Ceph.

---

## **Tahap 2: Penghapusan Instalasi Ceph yang Ada (Uninstallation)**

Lakukan di salah satu node Proxmox VE, kecuali diinstruksikan lain.

1.  **Hentikan dan Hapus Layanan Ceph dari Proxmox Storage:**
    - GUI: `Datacenter -> Storage`. Edit storage Ceph, hapus centang `Enable`. Lalu `Remove` storage tersebut.
    - Pastikan tidak ada VM/CT yang menggunakan disk dari storage Ceph.
2.  **Hapus Ceph Pool (Opsional, jika ingin bersih total):**
    - _Peringatan: Menghapus data di pool!_
    - Lihat daftar pool: `ceph osd lspools`
    - Hapus pool: `ceph osd pool delete <nama_pool> <nama_pool> --yes-i-really-really-mean-it`
3.  **Hapus OSD (Object Storage Daemons):**
    - Lihat OSD ID: `ceph osd tree`
    - Untuk setiap OSD:

      ```bash
      ceph osd out osd.<id>
      systemctl stop ceph-osd@<id>.service
      ceph osd down osd.<id>
      ceph osd crush remove osd.<id>
      ceph auth del osd.<id>
      ceph osd rm osd.<id>

      ```

    - Hancurkan OSD via Proxmox VE (per node):
      - GUI: `Node -> Ceph -> OSD`. Pilih OSD, klik `Destroy`.
      - CLI (pada node dengan OSD): `pveceph osd destroy osd.<id> --cleanup`

4.  **Hapus Monitor (MON):**
    - Lihat status: `ceph mon stat`
    - Hapus monitor (sisakan satu terakhir untuk dihapus):
      - GUI: `Node -> Ceph -> Monitor`. Pilih Monitor, klik `Destroy`.
      - CLI (node monitor): `pveceph mon destroy --node <nama_node_lain>` (ulangi), lalu `pveceph mon destroy --node $(hostname)` (untuk lokal).
5.  **Hapus Manager (MGR):**
    - Lihat status: `ceph mgr stat`
    - Hapus manager:
      - GUI: `Node -> Ceph -> Manager`. Pilih Manager, klik `Destroy`.
      - CLI (node manager): `pveceph mgr destroy --node <nama_node>`
6.  **Hapus Metadata Server (MDS) jika menggunakan CephFS:**
    - Nonaktifkan CephFS:

      ```sh
      ceph fs fail <nama_cephfs>
      ceph fs rm <nama_cephfs> --yes-i-really-really-mean-it

      ```

    - Hapus MDS (GUI: `Node -> Ceph -> CephFS` atau CLI).

7.  **Hapus Paket Ceph dari Semua Node:**
    - Lakukan di **setiap node**:

      ```bash
      apt update
      apt purge --auto-remove ceph ceph-common ceph-fuse ceph-mds librbd1 librados2 python3-ceph-argparse python3-cephfs python3-rados python3-rbd ceph-volume -y
      apt autoremove -y

      ```

---

## **Tahap 3: Pembersihan Sisa-sisa Konfigurasi Ceph**

Lakukan di **setiap node** Proxmox VE.

1.  **Hapus Direktori Konfigurasi dan Data Ceph:**

    ```bash
    rm -rf /etc/ceph/*
    rm -rf /var/lib/ceph/*
    rm -rf /var/log/ceph/*
    rm -f /etc/pve/ceph.conf

    ```

2.  **Wipe Disk yang Digunakan OSD (Sangat Hati-hati!):**
    - _Peringatan: Menghapus semua data di disk! Pilih disk yang benar!_
    - Untuk setiap disk OSD (misal `/dev/sdX`):

      ```bash
      sgdisk --zap-all /dev/sdX
      wipefs -a /dev/sdX
      # Opsional (lama): dd if=/dev/zero of=/dev/sdX bs=1M count=100 oflag=direct

      ```

    - Verifikasi: `fdisk -l /dev/sdX`

3.  **Restart Layanan Proxmox (jika perlu):**

    ```bash
    systemctl restart pvestatd
    systemctl restart pvedaemon

    ```

4.  **Reboot Semua Node (Direkomendasikan):**
    - Reboot setiap node satu per satu.

---

## **Tahap 4: Instalasi Ceph Baru**

1.  **Pilih Versi Ceph:**
    - Proxmox VE akan merekomendasikan versi yang kompatibel (misal, Quincy, Reef).
2.  **Instal Paket Ceph melalui Proxmox VE:**
    - Update sistem: `Node -> Updates` atau `apt update && apt full-upgrade -y`.
    - GUI: `Node -> Ceph`, klik "Install Ceph".
    - CLI (di **satu node dulu**, misal PVE1):

      ```bash
      pveceph install

      ```

      Pilih versi Ceph. Ulangi `pveceph install` di **semua node lain**.

3.  **Inisialisasi Klaster Ceph Baru:**
    - Lakukan dari **satu node saja**.
    - GUI: `Datacenter -> Ceph`. Klik "Initialize Ceph".
      - Isi **Public Network**, **Cluster Network** (opsional tapi direkomendasikan).
      - Pilih node pertama sebagai monitor awal.
    - CLI (di node pertama):

      ```bash
      # Contoh:
      pveceph init --network 192.168.1.0/24 --cluster-network 10.10.10.0/24

      ```

---

## **Tahap 5: Konfigurasi Ceph Baru**

1.  **Buat Monitor (MON) Tambahan:**
    - Minimal 3 MON (atau jumlah ganjil) untuk HA.
    - GUI: `Node -> Ceph -> Monitor`. Klik `Create`. Pilih node.
    - CLI: `pveceph mon create --node <nama_node_PVE_lain>`
2.  **Buat Manager (MGR) Tambahan (Opsional, disarankan):**
    - GUI: `Node -> Ceph -> Manager`. Klik `Create`. Pilih node.
    - CLI: `pveceph mgr create --node <nama_node_PVE_lain>`
3.  **Buat OSD (Object Storage Daemons):**
    - Pastikan disk OSD bersih.
    - GUI: `Node -> Ceph -> OSD`. Klik `Create: OSD`. Pilih disk.
    - CLI (di node pemilik disk): `pveceph osd create /dev/sdX`
4.  **Buat Pool Ceph:**
    - GUI: `Datacenter -> Ceph -> Pools`. Klik `Create`.
      - **Name:** (misal, `vm_data`).
      - **Size:** Jumlah replika (misal, 3).
      - **Min. Size:** Minimal replika (misal, 2 jika Size=3).
      - **PG Autoscale Mode:** `on` (direkomendasikan).
      - **PG Num:** (Jika autoscale `off`). Untuk RBD, mulai dengan nilai kecil (misal 32).
      - **Application:** `rbd` untuk pool VM.
    - CLI:

      ```
      ceph osd pool create vm_data 32
      ceph osd pool set vm_data size 3
      ceph osd pool set vm_data min_size 2
      ceph osd pool application enable vm_data rbd
      ceph osd pool set vm_data pg_autoscale_mode on

      ```

5.  **Tambahkan Storage Ceph ke Proxmox VE:**
    - GUI: `Datacenter -> Storage -> Add -> RBD`.
      - **ID:** Nama storage di Proxmox (misal, `ceph_vms`).
      - **Pool:** Pilih pool yang baru dibuat.
      - **Monitor(s):** Otomatis terisi.
      - **Username:** `admin`.
      - Centang `KRBD`.
      - Pilih `Content` (Disk image, ISO, dll.).

---

## **Tahap 6: Verifikasi dan Pengujian**

1.  **Periksa Kesehatan Klaster Ceph:**
    - GUI: `Datacenter -> Ceph` (Status kesehatan).
    - CLI: `ceph status` atau `ceph -s`. Target: `HEALTH_OK`. Jika `HEALTH_WARN`, periksa `ceph health detail`.
2.  **Periksa Status OSD:**
    - CLI: `ceph osd tree`. Semua OSD harus `up` dan `in`.
3.  **Periksa Status PG (Placement Group):**
    - CLI: `ceph pg stat`. Semua PG harus `active+clean`.
4.  **Uji Storage Baru:**
    - Buat VM baru di storage Ceph.
    - Unggah ISO ke storage Ceph.
    - Lakukan operasi I/O dasar.
5.  **Monitoring:**
    - Pantau kesehatan Ceph via GUI Proxmox atau `ceph -s`.

---

## **Tips Tambahan**

- **Dokumentasi Resmi:** Rujuk dokumentasi Proxmox VE dan Ceph.
- **CRUSH Map:** Untuk konfigurasi lanjutan (tipe disk, lokasi fisik), sesuaikan CRUSH map (topik kompleks).
- **Tuning:** Lakukan tuning parameter Ceph untuk performa optimal sesuai workload.
- **Backup Konfigurasi Ceph:** Cadangkan `/etc/pve/ceph.conf`, `/etc/ceph/ceph.conf`, dan `/etc/ceph/ceph.client.admin.keyring`.

---
