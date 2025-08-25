---
title: "Install ASTRO Docker"
description: "Install ASTRO Docker"
pubDate: 2025-08-08
category: "Docker"
image: "/assets/images/Blog/docker.webp"
author:
  name: "Fachmi"
  title: "SysAdmin"
  image: "/assets/images/Logo/font-logo.png"
---
# Install ASTRO Docker
Berikut adalah **langkah-langkah instalasi Astro (website dengan komponen game) menggunakan Docker** beserta **komponen pendukungnya**. Langkah ini mencakup penggunaan **Docker Compose** untuk menjalankan frontend, backend, dan database secara terisolasi.

* * *

### **🛠 1. Persiapan Prasyarat**

Pastikan Anda memiliki:

*   Docker ([https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop))
*   Docker Compose (sudah termasuk dalam Docker Desktop)
*   Kode sumber aplikasi (frontend, backend, database) yang sudah disiapkan.

* * *

### **🧱 2. Struktur Proyek**

Struktur proyek akan terdiri dari beberapa folder dan file:

```
/astro-game
│
├── frontend/              # Frontend (HTML/CSS/JS)
│   ├── index.html
│   └── styles.css
│
├── backend/               # Backend (Node.js + Express)
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml     # File konfigurasi Docker Compose
├── docker-compose.override.yml  # (opsional, untuk lingkungan produksi)
└── .env                   # (opsional, untuk variabel lingkungan)

```

* * *

### **📁 3. Komponen Pendukung**

#### **✅ Frontend:**

*   Aplikasi web sederhana (HTML/CSS/JS) untuk menampilkan game dan UI.
*   Dibungkus dengan **Nginx** atau **Node.js static server**.

#### **✅ Backend:**

*   API untuk menangani logika game (misalnya leaderboard, skor).
*   Menggunakan **Node.js + Express** sebagai backend.

#### **✅ Database:**

*   Membuat database MongoDB untuk menyimpan skor pemain dan data game.
*   Menggunakan **MongoDB** sebagai database.

* * *

### **🐳 4. Dockerfile dan Docker Compose**

#### **📄** `**docker-compose.yml**`

```
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    volumes:
      - ./frontend:/usr/share/nginx/html
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      MONGO_URI: mongodb://mongodb:27017/astro-game
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: always

volumes:
  mongo_data:
```

#### **📄** `**frontend/Dockerfile**`

```
FROM nginx:latest
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
EXPOSE 80

```

#### **📄** `**backend/Dockerfile**`

```
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

```

* * *

### **🔧 5. Contoh Backend (Node.js + Express)**

```
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Koneksikan MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/score', async (req, res) => {
  // Contoh endpoint untuk mengambil skor
  res.json({ score: "100" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
```

* * *

### **📁 6. File .env (Opsional)**

```
MONGO_URI=mongodb://mongodb:27017/astro-game

```

* * *

### **🚀 7. Build dan Run dengan Docker Compose**

1.  Buka terminal di folder proyek.
2.  Jalankan perintah berikut:

```
docker-compose up --build
```

*   Aplikasi frontend akan tersedia di `http://localhost`.
*   Backend akan tersedia di `http://localhost:3000`.
*   MongoDB akan berjalan di dalam container.

* * *

### **📌 8. Verifikasi**

1.  **Frontend**:
    
    *   Buka browser dan akses `http://localhost`.
    *   Pastikan UI game terlihat.
2.  **Backend**:
    
    *   Gunakan Postman atau curl untuk mengakses endpoint `/api/score`.
    *   Contoh: `curl http://localhost:3000/api/score`.
3.  **Database**:
    
    *   Akses MongoDB via `mongo` di terminal (jika diperlukan).

* * *

### **📌 9. Penyimpanan Data yang Berkelanjutan**

Jika Anda ingin menyimpan data MongoDB secara permanen, tambahkan volume:

```
volumes:
  mongo_data:
```

Pastikan folder `mongo_data` tidak dihapus saat build.

* * *

### **🧠 10.Tambahan**

*   Untuk lingkungan produksi, gunakan **reverse proxy** (Nginx) dan **Docker Swarm**.
*   Pastikan semua port terbuka di firewall (misalnya: 80, 3000, 27017).
*   Gunakan **docker-compose.override.yml** untuk mengatur konfigurasi berbeda di lingkungan produksi.

* * *

### **✅ Hasil Akhir**

Dengan langkah di atas, Anda akan memiliki:

*   Aplikasi frontend yang menjalankan game.
*   Backend yang menangani logika dan API.
*   Database MongoDB untuk menyimpan data pemain.

Semua komponen berjalan dalam container Docker yang terisolasi dan dapat di-scaling.