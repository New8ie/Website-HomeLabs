---
title: "Git Remote - Dokumentasi Lengkap"
description: "Panduan profesional untuk konfigurasi Git remote ke GitHub, termasuk perintah umum dan contoh penggunaannya."
pubDate: 2025-08-06
category: "Git"
image: "/assets/images/Logo/footer1-a-logo.svg"
author:
  name: "John Smith"
  title: "Sr. Developer - BlockWorld"
  image: "/assets/images/Logo/footer1-a-logo.svg"
---

# 📄 Dokumentasi Git Remote (GitHub) — Lengkap & Profesional

## 📌 Tujuan
Dokumen ini menjelaskan cara menggunakan Git Remote untuk menghubungkan repository lokal ke repository GitHub. Fokus utama adalah pada konfigurasi awal, manajemen remote, dan perintah yang paling sering digunakan.

## 🧰 Persyaratan Awal
- Git sudah terinstall (`git --version`)
- Akun GitHub sudah dibuat
- SSH key atau HTTPS akses ke GitHub (HTTPS lebih umum untuk pemula)

## ⚙️ 1. Inisialisasi Git di Folder Proyek
```bash
git init
```
> Membuat folder `.git/` untuk melacak versi proyek.

## 🔗 2. Menambahkan Remote ke GitHub
```bash
git remote add origin https://github.com/<username>/<repo-name>.git
```
Contoh:
```bash
git remote add origin https://github.com/New8ie/Website-HomeLabs.git
```

## 🖥️ 3. Melihat Remote yang Terdaftar
```bash
git remote -v
```
Contoh Output:
```
origin  https://github.com/New8ie/Website-HomeLabs.git (fetch)
origin  https://github.com/New8ie/Website-HomeLabs.git (push)
```

## 🔄 4. Mengganti atau Memperbarui Remote
```bash
git remote set-url origin https://github.com/New8ie/RepoBaru.git
```

## ❌ 5. Menghapus Remote
```bash
git remote remove origin
```

## 📤 6. Push ke Remote
```bash
git push -u origin main
```
Jika ingin menimpa isi di GitHub:
```bash
git push -f origin main
```

## 📥 7. Pull dari Remote
```bash
git pull origin main
```
Dengan rebase:
```bash
git pull origin main --rebase
```

## 🧾 8. Menampilkan Detail Remote Lengkap
```bash
git remote show origin
```

## 🔀 9. Mengganti Nama Remote
```bash
git remote rename origin github
```

## 🧠 Tips Tambahan
Membuat branch `main`:
```bash
git checkout -b main
```
Atau rename:
```bash
git branch -M main
```

## 📚 Rangkuman Command Git Remote

| Tujuan                            | Perintah                                                                 |
|----------------------------------|--------------------------------------------------------------------------|
| Inisialisasi Git                 | `git init`                                                               |
| Tambah remote                    | `git remote add origin <url>`                                            |
| Cek remote                       | `git remote -v`                                                          |
| Rename remote                    | `git remote rename origin github`                                        |
| Ubah URL remote                  | `git remote set-url origin <url>`                                        |
| Hapus remote                     | `git remote remove origin`                                               |
| Push awal                        | `git push -u origin main`                                                |
| Force push                       | `git push -f origin main`                                                |
| Pull                             | `git pull origin main`                                                   |
| Pull dengan rebase               | `git pull origin main --rebase`                                          |
| Tampilkan info remote            | `git remote show origin`                                                 |

---

## 🔁 Rollback Lokal ke Remote GitHub

Rollback digunakan untuk mengembalikan kondisi repository lokal ke kondisi yang ada di remote (GitHub). Cocok digunakan jika ingin membatalkan commit lokal atau membuang perubahan lokal.

### ✅ 1. Reset Penuh ke Remote (origin/main)
```bash
git fetch origin
git reset --hard origin/main
```
> Menghapus semua commit & perubahan lokal. Tidak bisa dibatalkan tanpa backup.

### ✅ 2. Reset File Tertentu ke Versi GitHub
```bash
git checkout origin/main -- path/to/file.txt
```

### ✅ 3. Hapus Semua Perubahan Lokal yang Belum Di-commit
```bash
git restore .
git clean -fd
```

### ✅ 4. Undo Commit Terakhir (tetap simpan perubahan)
```bash
git reset --soft HEAD~1
```
> Commit dibatalkan, tapi perubahan tetap ada di staging.

### 🛡️ Tips: Buat Branch Backup Sebelum Reset
```bash
git branch backup-before-reset
```
> Untuk jaga-jaga jika ingin kembali ke kondisi sebelum rollback.
