# Patient Management System

## 🎯Tujuan

Membangun REST API sederhana menggunakan Express.js, TypeORM, dan PostgreSQL untuk mengelola data pasien dan riwayat kunjungan pasien di rumah sakit. Proyek ini akan melatih pemahaman dasar tentang:

- Routing dan Controller di Express.js

- Relasi antar tabel di database

- Operasi CRUD (Create, Read, Update, Delete)

- Modularisasi kode backend

## 🔧 Fitur API yang Harus Dibuat

**📌 Endpoint untuk Pasien**

- GET /patients → Menampilkan semua data pasien

- GET /patients/:id → Menampilkan detail satu pasien

- POST /patients → Menambahkan data pasien baru

- PUT /patients/:id → Mengedit data pasien

- DELETE /patients/:id → Menghapus data pasien

**📌 Endpoint untuk Kunjungan**

- GET /patients/:id/visits → Menampilkan semua kunjungan untuk satu pasien

- POST /patients/:id/visits → Menambahkan kunjungan untuk pasien

- DELETE /visits/:id → Menghapus data kunjungan

**💡 Catatan Teknis**

- Gunakan uuid sebagai primary key

- Gunakan dotenv untuk konfigurasi database

- Simpan file terpisah untuk:

  - Entity (model) => Untuk mendefinisikan struktur tabel di database

  - Repository => Untuk mengelola query ke database

  - Controller => Untuk menangani logika bisnis dan request dari client

  - Route => Untuk mendefinisikan endpoint API

- Gunakan struktur folder modular

**🗂️ Struktur Folder yang Disarankan**

```
hospital-api/
├── src/
│   ├── entities/
│   │   ├── Patient.js
│   │   └── Visit.js
│   ├── controllers/
│   │   ├── patient.controller.js
│   │   └── visit.controller.js
│   ├── routes/
│   │   ├── patient.routes.js
│   │   └── visit.routes.js
│   ├── repository/
│   │   ├── patient.repository.js
│   │   └── visit.repository.js
│   ├── data-source.js
│   └── app.js
├── .env
├── package.json
└── README.md

```

**📦 Paket yang Diperlukan**

| Paket     | Fungsi                                           |
| --------- | ------------------------------------------------ |
| `express` | Framework web minimalis untuk membuat REST API   |
| `pg`      | PostgreSQL client untuk Node.js                  |
| `typeorm` | ORM untuk mengelola tabel & relasi database      |
| `dotenv`  | Mengelola konfigurasi dari file `.env`           |
| `uuid`    | Untuk membuat ID unik (UUID)                     |
| `nodemon` | (dev only) Auto-restart server saat file berubah |

**📂 API Prefix**

Semua endpoint diawali dengan prefix:

```bash
/v1/api/
```

Contoh:

- Ambil semua pasien: GET /v1/api/patients
- Tambah pasien baru: POST /v1/api/patients
- Tambah kunjungan untuk pasien: POST /v1/api/visits/patients/:patientId

## Alur mengerjakan

1. Directory entities => buat entity jika table belum ada
2. Directory repository => buat query untuk operasi sesuai dengan kebutuhan
3. Directory controller => untuk logic bisnis
4. Directory routes => membuat endpoint/url
