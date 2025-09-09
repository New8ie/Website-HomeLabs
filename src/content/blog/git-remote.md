---
title: "Git Remote - Dokumentasi Lengkap"
description: "Panduan profesional untuk konfigurasi Git remote ke GitHub, termasuk perintah umum dan contoh penggunaannya."
pubDate: 2025-08-06
category: "Git"
image: "/assets/images/Blog/Brands/git.png"
author:
  name: "Fachmi"
  title: "Admin"
  image: "/assets/images/Logo/font-logo.svg"
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

```bash
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

| Tujuan                | Perintah                          |
| --------------------- | --------------------------------- |
| Inisialisasi Git      | `git init`                        |
| Tambah remote         | `git remote add origin <url>`     |
| Cek remote            | `git remote -v`                   |
| Rename remote         | `git remote rename origin github` |
| Ubah URL remote       | `git remote set-url origin <url>` |
| Hapus remote          | `git remote remove origin`        |
| Push awal             | `git push -u origin main`         |
| Force push            | `git push -f origin main`         |
| Pull                  | `git pull origin main`            |
| Pull dengan rebase    | `git pull origin main --rebase`   |
| Tampilkan info remote | `git remote show origin`          |

---

# Git Thoubleshut pust & pull

### **Jika ingin menggabungkan perubahan dari GitHub + perubahan lokal**

Gunakan git pull --rebase agar commit kamu disusun di atas commit yang ada di remote (lebih rapi dari merge biasa):

```bash
git pull --rebase origin main
git push origin main

```

Kalau ada konflik, Git akan berhenti di file yang konflik, kamu harus menyelesaikan lalu lanjutkan rebase dengan:

```bash
git add <file-yang-dikonflik>
git rebase --continue
```

---

### **2️⃣ Jika yakin mau menimpa remote dengan versi lokal**

> [!CAUTION]
> ⚠️ Ini akan menghapus commit yang ada di GitHub tapi belum ada di lokal

```bash
git push --force origin main

```

Gunakan ini hanya jika kamu yakin tidak butuh commit yang ada di remote.

---

Kalau mau aman, saya sarankan jalankan dulu:

```bash
git fetch origin
git log --oneline origin/main

```

Biar kamu bisa lihat commit yang ada di remote sebelum memutuskan mau rebase atau force push.

## **1️⃣ Menghapus di commit berikutnya (cara aman & biasa)**

Kalau mau hapus file mulai dari commit berikutnya saja:

```cmake
git rm path/ke/file.txt
git commit -m "Hapus file.txt"
git push origin main

```

📌 Ini hanya menghapus file dari repo ke depannya, tapi file masih ada di commit lama (riwayat Git).

---

## **2️⃣ Menghapus dari riwayat Git (benar-benar hilang)**

Kalau file berisi data sensitif (misalnya password, API key), dan ingin hilang dari seluruh riwayat commit

```cmake
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch path/ke/file.txt" \
--prune-empty --tag-name-filter cat -- --all

```

Lalu force push ke remote:

```cmake
git push origin --force --all

```

📌 Ini akan mengubah riwayat repo, jadi **hati-hati** kalau repo dipakai oleh orang lain, mereka harus re-clone repo setelahnya.

---

## **3️⃣ Menghapus banyak file sekaligus dari commit lama**

Kalau file sudah banyak dan besar, lebih baik pakai [`git filter-repo`](https://github.com/newren/git-filter-repo) (lebih cepat dari filter-branch):

```cmake
git filter-repo --path path/ke/file.txt --invert-paths
git push origin --force --all
```
