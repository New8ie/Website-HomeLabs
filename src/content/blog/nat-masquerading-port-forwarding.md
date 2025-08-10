---
title: "Konfigurasi NAT Masquerading dan Port Forwarding di Debian"
description: "Panduan konfigurasi NAT Masquerading dan Port Forwarding menggunakan iptables di Debian untuk jaringan lokal dan akses internet."
pubDate: 2025-08-08
category: "Networking"
image: "/assets/images/Logo/footer1-a-logo.svg"
author:
  name: "Fachmi"
  title: "Admin"
  image: "/assets/images/Logo/footer1-a-logo.svg"
---

# NAT Masquerading dan Port Forwarding di Debian

Agar klien di jaringan lokal (LAN) dapat mengakses internet melalui satu IP publik, dan untuk meneruskan koneksi dari internet ke server lokal.

---

## 🛠️ Prasyarat

- Sistem operasi: Debian (10/11/12)  
- Akses root atau sudo  
- Dua interface jaringan:  
  - `eth0`: terhubung ke internet  
  - `eth1`: terhubung ke jaringan lokal (LAN)  

---

## 1. 🔧 Aktifkan IP Forwarding

Edit file `/etc/sysctl.conf`:

```bash
sudo nano /etc/sysctl.conf
```

Cari dan ubah atau aktifkan baris berikut:

```conf
net.ipv4.ip_forward = 1
```

Aktifkan perubahan tanpa reboot:

```bash
sudo sysctl -p
```

> **Fungsi:** Mengaktifkan kemampuan sistem untuk meneruskan paket antar interface (router behavior).

---

## 2. 🔥 Konfigurasi NAT Masquerade (SNAT)

Jalankan perintah berikut:

```bash
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### Penjelasan:

| Komponen       | Fungsi                                                       |
| -------------- | ------------------------------------------------------------|
| `-t nat`       | Menunjukkan aturan berada di tabel NAT                      |
| `-A POSTROUTING` | Menambahkan aturan pada chain POSTROUTING                  |
| `-o eth0`      | Berlaku untuk paket keluar lewat interface eth0 (ke internet) |
| `-j MASQUERADE`| Mengubah source IP paket menjadi IP publik dari eth0 (dinamis) |

> **Note:**  
> `MASQUERADE` digunakan saat IP publik bersifat dinamis (DHCP). Jika IP publik statik, gunakan SNAT seperti contoh di bawah:  

```bash
sudo iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source 203.0.113.2
```

---

## 3. 🌐 Port Forwarding (DNAT)

Contoh: Meneruskan trafik dari port 80 publik ke server internal `192.168.1.100` port 80.

```bash
# Forward port 80 dari IP publik ke server internal
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 \
  -j DNAT --to-destination 192.168.1.100:80

# Izinkan forwarding dari interface internal ke IP internal server
sudo iptables -A FORWARD -p tcp -d 192.168.1.100 --dport 80 -m state \
  --state NEW,ESTABLISHED,RELATED -j ACCEPT
```

### Penjelasan:

| Komponen          | Fungsi                                                  |
| ----------------- | -------------------------------------------------------|
| `-t nat`          | Tabel NAT                                               |
| `-A PREROUTING`   | Menangani paket sebelum routing decision               |
| `-i eth0`         | Paket masuk dari interface eth0 (internet)             |
| `-p tcp --dport 80` | Protokol TCP dengan tujuan port 80                     |
| `-j DNAT`         | Ubah alamat tujuan                                      |
| `--to-destination`| Alamat tujuan baru (server lokal)                       |

---

## 4. 📥 Forwarding Lalu Lintas

Untuk semua lalu lintas yang masuk dari internet dan menuju server LAN, izinkan forwarding:

```bash
sudo iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A FORWARD -i eth0 -o eth1 -p tcp --dport 80 -d 192.168.1.100 -j ACCEPT
```

---

## 5. 💾 Menyimpan Konfigurasi iptables (Agar Persisten)

Debian tidak menyimpan iptables secara default. Untuk menyimpan konfigurasi:

### a. Install iptables-persistent

```bash
sudo apt install iptables-persistent
```

Saat instalasi, sistem akan menanyakan apakah aturan akan disimpan. Jika tidak, jalankan manual:

```bash
sudo netfilter-persistent save
```

Agar aturan dimuat otomatis saat boot:

```bash
sudo systemctl enable netfilter-persistent
```

---

## 🔍 Cek & Debug

- Lihat aturan NAT:

```bash
sudo iptables -t nat -L -n -v
```

- Lihat aturan FORWARD:

```bash
sudo iptables -L FORWARD -n -v
```

---

## 🛡️ Tips Keamanan

- Jangan lupa mengatur firewall yang memblokir koneksi tidak sah dari luar.  
- Gunakan fail2ban atau IDS jika port terbuka ke internet.  
- Batasi akses port forwarding hanya untuk IP tertentu jika perlu.

---

## 📌 Contoh Kasus Nyata

**Topologi:**

```
Internet
   |
[ eth0 - 203.0.113.10 ]
   |
[ Debian Router ]
   |
[ eth1 - 192.168.1.1 ] ——> [ Server: 192.168.1.100 ]
```

**Tujuan:**

- Semua klien LAN bisa akses internet  
- Port 80 publik diarahkan ke server 192.168.1.100

**Perintah Singkat:**

```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# NAT Masquerading
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# DNAT Port Forward
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to 192.168.1.100:80
iptables -A FORWARD -p tcp -d 192.168.1.100 --dport 80 -j ACCEPT
```

---

## 📚 Referensi Tambahan

- `man iptables`  
- [Debian iptables Wiki](https://wiki.debian.org/iptables)  
- [Netfilter/NAT](https://netfilter.org/)
