---
title: "Windows Server AD Replication"
description: "Create Server AD Replication"
pubDate: 2025-08-08
category: "Windows"
image: "/assets/images/Blog/Brands/windows.png"
author:
  name: "Fachmi"
  title: "Admin"
  image: "/assets/images/Logo/font-logo.png"
---

# Panduan DC Replika di WinSer 2025

## 📘 **Menambahkan Domain Controller Replika di Windows Server 2025**

### 🌐 Nama Domain: **thismydomains.com**

---

## 🧰 **Prasyarat**

1. Sudah dikonfigurasi sebagai Domain Controller di server pertama
2. Gunakan IP statik (misalnya: `192.168.48.15` untuk DC1, `192.168.48.16` untuk DC2)
3. Server sekunder harus mengarah ke IP DC1
4. Akun dengan hak **Domain Admin**

---

## 🪜 Langkah-langkah Konfigurasi

### 🔧 1. **Konfigurasi IP dan DNS**

Di server kedua (`192.168.48.16`):

- Set **IP address** statik
- Set **DNS Server** → `192.168.48.15` (IP DC1)

---

### 🔗 2. **Join Domain**

1. Klik kanan **This PC > Properties > Rename PC**
2. Klik **Change** > pilih **Domain**: `thismydomains.com`
3. Masukkan akun **Domain Admin**
4. Restart server setelah join domain

---

### 🏗️ 3. **Install AD DS Role di Server Kedua**

#### GUI:

- **Server Manager > Add roles and features**
- Pilih **Active Directory Domain Services**
- Klik **Next** hingga **Install**

#### PowerShell:

```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
```

---

### 🧩 4. **Promosikan Menjadi Replica Domain Controller**

#### GUI:

- Klik notifikasi kuning > **Promote this server to a domain controller**
- Pilih: **Add a domain controller to an existing domain**
- Domain: `thismydomains.com`
- Gunakan akun **Domain Admin**
- Centang: **DNS Server** dan **Global Catalog**
- Atur **DSRM password**
- Klik **Next** sampai selesai

#### PowerShell alternatif:

```powershell
Install-ADDSDomainController `
  -DomainName "thismydomains.com" `
  -InstallDns `
  -Credential (Get-Credential) `
  -SiteName "Default-First-Site-Name"
```

---

### ✅ 5. **Verifikasi Replikasi**

Setelah reboot:

#### PowerShell:

```powershell
repadmin /replsummary
repadmin /showrepl
```

#### GUI:

- Buka **Active Directory Sites and Services**
- Pastikan DC2 muncul
- Periksa **NTDS Settings** memiliki inbound & outbound connections

---

### 🩺 6. **Tes Kesehatan AD**

```powershell
dcdiag /v
```

```powershell
nslookup thismydomains.com
```

---

## 🔐 Port yang Harus Dibuka (Antara DC1 dan DC2)

| Layanan                              | Port            |
| ------------------------------------ | --------------- |
| RPC                                  | TCP 135         |
| LDAP                                 | TCP/UDP 389     |
| Kerberos                             | TCP/UDP 88      |
| DNS                                  | TCP/UDP 53      |
| SMB                                  | TCP 445         |
| Dynamic RPC range (Win Server 2022+) | TCP 49152–65535 |

---

## 📦 Tips Lanjutan

- Gunakan **NTP sinkronisasi waktu**: semua DC harus memiliki waktu yang konsisten
- Hindari **VM snapshot** pada DC
- Backup AD secara berkala (gunakan Windows Server Backup atau Veeam)
- Gunakan **Sites and Services** jika jaringan multi-location
