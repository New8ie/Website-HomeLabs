---
title: NUC Gen12 Proxmox Thunderbolt
pubDate: 2025-08-29T14:47:41.283Z
description: Installasi Thunderbold di Proxmox NUC Gen 12
category: Virualisasi
image: /assets/images/Blog/Proxmox-TB-3.jpg
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Blog/Proxmox-TB-1.png
---

# Add Thunderbolts Network Proxmox

## 🔧 1. Load Kernel Modules

Beberapa kernel module perlu dimuat saat boot untuk mendukung koneksi Thunderbolt, terutama `thunderbolt` dan `thunderbolt-net`. Meskipun bisa saja bekerja tanpa `thunderbolt-net`, modul TB ini memiliki perilaku khusus sehingga **wajib di mount** di semua node.

### Langkah-langkah:

Edit file `/etc/modules`:

```sh
nano /etc/modules
```

Tambahkan baris berikut di **bagian bawah**:

```sh
thunderbolt thunderbolt-net
```

Simpan dengan:

- Tekan `CTRL + X`
- Tekan `Y`
- Tekan `Enter`

---

## 🌐 2. Rename Interface Thunderbolt

Nama antarmuka Thunderbolt (misalnya `thunderbolt0`) tidak tetap dan bisa berubah tergantung urutan koneksi kabel. Untuk menghindari masalah, kita **beri nama tetap** menggunakan `.link` file berdasarkan path PCI.

### Langkah-langkah:

1.  Cek path PCI untuk Thunderbolt:

```sh
udevadm monitor

```

Colok kabel Thunderbolt untuk melihat output berupa path seperti:

```sh
0000:00:0d.2 0000:00:0d.3
```

2.  Buat file link pertama:

```sh
nano /etc/systemd/network/00-thunderbolt0.link

```

Isi file:

```sh
[Match] Path=pci-0000:00:0d.2 Driver=thunderbolt-net

[Link] MACAddressPolicy=none
Name=en05

```

3.  Buat file link kedua:

```sh
nano /etc/systemd/network/00-thunderbolt1.link

```

Isi file:

```sh
[Match] Path=pci-0000:00:0d.3 Driver=thunderbolt-net

[Link] MACAddressPolicy=none
Name=en06

```

![TB3](/assets/images/Blog/Proxmox-TB-2.png)

---

## 🔁 3. Pastikan Interface Aktif Saat Boot & Kabel Dicolok

Karena Thunderbolt kadang tidak otomatis aktif saat boot atau saat kabel dicolok, maka kita buat aturan `udev` + skrip untuk memaksa `ifup`.

### Langkah-langkah:

- Buat rule udev:

```sh
nano /etc/udev/rules.d/10-tb-en.rules

```

Isi:

```sh
ACTION=="move", SUBSYSTEM=="net", KERNEL=="en05", RUN+="/usr/local/bin/pve-en05.sh"
ACTION=="move", SUBSYSTEM=="net", KERNEL=="en06", RUN+="/usr/local/bin/pve-en06.sh"
```

- Buat skrip untuk en05:

`nano /usr/local/bin/pve-en05.sh`

Isi:

```sh
#!/bin/bash

LOGFILE="/tmp/udev-debug.log"
VERBOSE=""
IF="en05"

echo "$(date): pve-$IF.sh triggered by udev" >> "$LOGFILE"

for i in {1..10}; do
    echo "$(date): Attempt $i to bring up $IF" >> "$LOGFILE"
    /usr/sbin/ifup $VERBOSE $IF >> "$LOGFILE" 2>&1 && {
        echo "$(date): Successfully brought up $IF on attempt $i" >> "$LOGFILE"
        break
    }
    echo "$(date): Attempt $i failed, retrying in 3 seconds..." >> "$LOGFILE"
    sleep 3
done
```

- Buat skrip untuk en06:

```sh
nano /usr/local/bin/pve-en06.sh

```

Isi sama dengan di atas, ganti:

`IF="en06"` 

- Jadikan executable:

```sh
chmod +x /usr/local/bin/*.sh

```

---

## 🧠 4. Regenerasi Initramfs

```sh
update-initramfs -u -k all

```

---

## 🔁 5. Alternatif: Gunakan systemd Service

Jika tidak ingin menggunakan `udev` + skrip, buat systemd service:

```sh
nano /etc/systemd/system/thunderbolt-up.service

```

Isi:

```sh
[Unit] Description=Bring up Thunderbolt interface after Thunderbolt is ready
After=basic.target
Before=network-pre.target networking.service
Wants=network-pre.target
DefaultDependencies=no

[Service] Type=oneshot
ExecStartPre=/usr/bin/udevadm settle
ExecStartPre=/bin/bash -c 'for i in {1..10}; do ip link show en05 && exit 0; sleep 1; done; exit 1' ExecStart=/sbin/ip link set en05 up
RemainAfterExit=yes

[Install] WantedBy=network.target

```

Aktifkan service:

```sh
systemctl daemon-reexec systemctl enable thunderbolt-up systemctl start thunderbolt-up
```

---

## 🛠️ 6. Instalasi `tbtools`

Alat ini untuk memonitor sistem Thunderbolt. Jangan instal `rust` dari apt! Gunakan `rustup`.

### Langkah-langkah:

```sh
apt install pkg-config libudev-dev git curl
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
git clone https://github.com/intel/tbtools
cd tbtools
cargo install --path .

```

---

## ✅ Penutup

Konfigurasi ini akan memastikan bahwa koneksi Thunderbolt Anda:

- Memiliki nama antarmuka tetap (`en05`, `en06`)
- Aktif otomatis saat boot atau kabel dicolok
- Stabil digunakan untuk bridge di Proxmox (mis. `vmbr1`)
