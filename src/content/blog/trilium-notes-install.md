---
title: "Installation Trilium"
description: "Instalasi, Upgrade, dan Restore Database "
pubDate: 2025-08-08
category: "Others"
image: "/assets/images/Blog/trilium-notes_1.png"
author:
  name: "Fachmi"
  title: "Admin"
  image: "/assets/images/Logo/font-logo.png"
---

# Panduan Instalasi, Upgrade, dan Restore Database Trilium Notes

Dokumen ini ditujukan untuk setup **Trilium Notes Server** secara manual, termasuk proses instalasi, pembuatan user khusus (`trilium`), konfigurasi service systemd, dan proses restore database dari backup lama.

---

## 1\. Persiapan Sistem

### 1.1. Install Dependencies

```
sudo apt update
sudo apt install -y curl wget sqlite3 unzip nano systemd
```

### 1.2. Tambahkan User `trilium`

```
sudo useradd -r -s /bin/bash -m -d /opt/trilium trilium
sudo passwd trilium  # (opsional, hanya jika ingin login manual)
```

### 1.3. Install Node.js (via NVM dengan user `trilium`)

```
sudo -u trilium bash -c '
  # Download and install nvm:
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

  # in lieu of restarting the shell
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  # Install Node.js:
  nvm install 22

  # Verifikasi versi:
  node -v       # Harus muncul v22.16.0
  nvm current   # Harus muncul v22.16.0
  npm -v        # Harus muncul 10.9.2
'
```

---

## 2\. Instalasi Trilium Server

### 2.1. Unduh dan Ekstrak Trilium

```
cd /opt
sudo wget https://github.com/zadam/trilium/releases/download/v0.63.7/trilium-linux-x64-server.tar.xz
sudo tar -xvf trilium-linux-x64-server.tar.xz
sudo mv trilium-linux-x64-server trilium
sudo chown -R trilium:trilium /opt/trilium
```

### 2.2. Buat Script Startup: `/opt/trilium/trilium.sh`

```
#!/usr/bin/env bash
source /opt/trilium/.nvm/nvm.sh
export PATH="/opt/trilium/.nvm/versions/node/v22.16.0/bin:$PATH"
cd /opt/trilium
exec node main.cjs -- --port 8080
```

```
sudo chmod +x /opt/trilium/trilium.sh
sudo chown trilium:trilium /opt/trilium/trilium.sh
```

### 2.3. Buat systemd Service

**/etc/systemd/system/trilium.service**

```
[Unit]
Description=Trilium Notes Server
After=network.target

[Service]
Type=simple
User=trilium
WorkingDirectory=/opt/trilium
ExecStart=/opt/trilium/trilium.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### 2.4. Start Service

```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable --now trilium
```

---

## 3\. Struktur Direktori Penting

```
/opt/trilium/                # Binary dan skrip Trilium
/opt/trilium-data/           # Data dan konfigurasi Trilium
```

---

## 4\. Restore Database Lama

### 4.1. Stop Service Trilium

```
sudo systemctl stop trilium
```

### 4.2. Restore File

Pastikan Anda memiliki file:

- `document.db`
- `config.ini`
- `session_secret.txt`

Kemudian salin ke direktori `trilium-data`:

```
sudo cp /path/backup/document.db /opt/trilium-data/
sudo cp /path/backup/config.ini /opt/trilium-data/
sudo cp /path/backup/session_secret.txt /opt/trilium-data/
sudo chown trilium:trilium /opt/trilium-data/*
```

### 4.3. Jalankan Kembali

```
sudo systemctl start trilium
```

---

## 5\. Tes Akses

Akses melalui browser:

```
http://<ip-server>:8080
```

---

## 6\. Opsional: Otomatisasi Backup Script

Contoh `backup.sh`:

```
#!/bin/bash
LOG_FILE="/opt/trilium/backup.log"
DATA_DIR="/opt/trilium-data"
BACKUP_DIR="/opt/backup"
NOW=$(date)

echo "[$NOW] Starting backup..." >> "$LOG_FILE"
sqlite3 "$DATA_DIR/document.db" ".backup '$BACKUP_DIR/document-$(date +%F_%T).db'"
echo "[$NOW] Backup finished." >> "$LOG_FILE"
```

---

## 7\. Troubleshooting

- `**node: not found**` → Pastikan `nvm` dan PATH node.js sudah diset di `trilium.sh`
- `**document.db**` **not found** → Restore belum dilakukan atau path salah
- `**permission denied**` **/ status=126** → Pastikan `trilium.sh` memiliki permission eksekusi (`chmod +x`) dan dimiliki oleh user `trilium`
- `**MODULE_NOT_FOUND**` **untuk** `**server.js**` → Pastikan menggunakan `main.cjs` bukan `server.js`
- `**nvm.sh: No such file**` → Pastikan `.nvm` sudah terpasang di home direktori user `trilium`
- `**exec: node: is a directory**` → Pastikan `exec node` mengarah ke binary, bukan folder. Recheck isi `PATH`

## ![Tampilan Dashboard Trilium Notes](/assets/images/Blog/trilium-notes_2.png)

[github][def]


[def]: https://github.com/TriliumNext/Trilium.git