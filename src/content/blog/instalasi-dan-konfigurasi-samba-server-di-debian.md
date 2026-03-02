---
title: Samba Server di Debian
description: Instalasi dan Konfigurasi Samba Server di Debian
pubDate: 2026-03-01
category: Linux
author:
   name: Fachmi
   title: SysAdmin
   image: /assets/images/Logo/font-logo.png
image: /assets/images/Blog/Brands/samba.png
---
# Instalasi dan Konfigurasi Samba Server di Debian

## 1\. Persiapan Disk Eksternal

Pastikan disk sudah dikenali oleh sistem. Berdasarkan `/etc/fstab`:

```sh
### Disk
UUID=b40d8b1e-432f-4e59-881e-dc49ee3c8ea /mnt/disk1 btrfs defaults,noatime,nofail 0 0
UUID=afa414b2-78cb-4bcb-b0f1-6590c0619592 /mnt/disk2 ext4 defaults,noatime,nofail 0 2

```

### Langkah Mount Disk

```
# Buat mount point jika belum ada
sudo mkdir -p /mnt/disk1
sudo mkdir -p /mnt/disk2

# Mount disk sesuai fstab
sudo mount -a

# Cek apakah disk sudah ter-mount
df -h

```

## 2\. Persiapan Directory untuk Samba Share

Buat folder share sesuai kebutuhan:

```sh
# Folder target di /mnt/disk1
sudo mkdir -p /mnt/disk1/Tank/Backup/Veeam
sudo mkdir -p /mnt/disk1/Tank/Backup/PBS
sudo mkdir -p /mnt/disk1/Tank/PVE-Datastore
sudo mkdir -p /mnt/disk1/Tank/Guacamole-NFS

# Folder share Samba
sudo mkdir -p /srv/samba/Veeam
sudo mkdir -p /srv/samba/PBS
sudo mkdir -p /srv/samba/PVE-Datastore
sudo mkdir -p /srv/samba/Guacamole

```

## 3\. Bind Mount ke Folder Samba (Opsional)

Jika ingin tetap menyimpan data di disk tetapi di-share melalui Samba:

```
# Tambahkan di /etc/fstab
/mnt/disk1/Tank/Backup/Veeam      /srv/samba/Veeam        none bind 0 0
/mnt/disk1/Tank/Backup/PBS        /srv/samba/PBS          none bind 0 0
/mnt/disk1/Tank/PVE-Datastore     /srv/samba/PVE-Datastore none bind 0 0
/mnt/disk1/Tank/Guacamole-NFS     /srv/samba/Guacamole     none bind 0 0

# Mount semua bind
sudo mount -a

# Cek bind mount
mount | grep /srv/samba

```

## 4\. Instalasi Samba Server

```
sudo apt update
sudo apt install samba -y

```

Cek service Samba:

```sh
sudo systemctl status smbd
sudo systemctl status nmbd

```

## 5\. Konfigurasi Samba Share

Edit `/etc/samba/smb.conf` dan tambahkan share:

```sh
[Veeam]
   path = /srv/samba/Veeam
   browseable = yes
   read only = no
   guest ok = no

[PBS]
   path = /srv/samba/PBS
   browseable = yes
   read only = no
   guest ok = no

[PVE-Datastore]
   path = /srv/samba/PVE-Datastore
   browseable = yes
   read only = no
   guest ok = no

[Guacamole]
   path = /srv/samba/Guacamole
   browseable = yes
   read only = no
   guest ok = no

```

## 6\. Buat User Samba

```
# Tambah user sistem jika belum ada
sudo useradd -M -s /sbin/nologin sambauser
sudo passwd sambauser

# Tambah user ke Samba
sudo smbpasswd -a sambauser
sudo smbpasswd -e sambauser

```

## 7\. Restart Samba Server

```
sudo systemctl restart smbd
sudo systemctl restart nmbd

```

## 8\. Konfigurasi Firewall (Jika Ada)

Pastikan port Samba terbuka:

```
sudo ufw allow Samba
sudo ufw reload

```

## 9\. Mount Samba Share di Client

Di client Linux, gunakan `mount.cifs`:

```sh
sudo mkdir -p /mnt/Veeam
sudo mount -t cifs //192.168.48.8/Veeam /mnt/Veeam -o username=sambauser,password=YourPassword,uid=$(id -u),gid=$(id -g)

## Example With domain 
sudo mount -t cifs //192.168.48.111/Software /mnt/TrueNAS \
-o username='UserAD',password='password',domain='thismydomains',vers=3.0


# Cek mount
df -h | grep /mnt

```

Untuk auto-mount saat boot, tambahkan di `/etc/fstab` client:

```
//192.168.48.8/Veeam          /mnt/Veeam          cifs username=sambauser,password=YourPassword,uid=1000,gid=1000 0 0
//192.168.48.8/PBS            /mnt/PBS            cifs username=sambauser,password=YourPassword,uid=1000,gid=1000 0 0
//192.168.48.8/PVE-Datastore   /mnt/PVE-Datastore  cifs username=sambauser,password=YourPassword,uid=1000,gid=1000 0 0
//192.168.48.8/Guacamole       /mnt/Guacamole      cifs username=sambauser,password=YourPassword,uid=1000,gid=1000 0 0

```

## 10\. Menyalin File dengan Permission dan Owner di Samba

Karena Samba menggunakan permission mapping, gunakan `rsync` atau `cp` di client dengan opsi biasa. Jika file owner/permission penting, gunakan mount option `uid`, `gid` atau lakukan operasi sebagai user yang sesuai:

```sh
# Contoh copy file dari share ke lokal
rsync -av /mnt/Veeam/ /local/path/
```

## 11\. Cek SMB Share dari Linux (Client)

Install dulu kalau belum ada:

List Share dari Server

```sh
smbclient -L //IP_SERVER -U username
smbclient -L //192.168.48.12 -U administrator

Sharename       Type
---------       ----
IPC$            IPC
Public          Disk
Data            Disk
```

Akses Share untuk Test

```sh
smbclient //192.168.48.12/Public -U administrator
```

Kalau masuk prompt:

```ruby
smb: \>
```

Berarti share jalan.

## 12\. Cek di Server Linux (Kalau Server Pakai Samba)

```sh
testparm -s
```

```sh
smbstatus
```

## 13\. ADD User SMB

Jika Server Pakai Linux

Buat User Linux (jika belum ada)

```sh
sudo useradd -m username
sudo passwd username
```

Tambahkan ke Database Samba

```sh
sudo smbpasswd -a username
```

Akan diminta set password SMB.

Aktifkan user:

```sh
sudo smbpasswd -e username
```

Share Mengizinkan User 

Edit `/etc/samba/smb.conf`

```sh
[Data]
  path = /data/share
  valid users = username
  read only = no
```

Set permission folder:

```sh
sudo chown -R username:username /data/share
sudo chmod -R 770 /data/share
```

Restart Samba

```sh
sudo systemctl restart smbd
```

* * *