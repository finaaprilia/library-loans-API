# Library Loan Management API

RESTful API untuk manajemen peminjaman buku perpustakaan, dibangun menggunakan Node.js, Express.js, dan Supabase sebagai database backend. API ini di-deploy secara serverless menggunakan Vercel.

---

## Links

| Keterangan | URL |
| --- | --- |
| GitHub Repository | https://github.com/finaaprilia/library-loans-API |
| Base URL Deployment (Vercel) | https://library-loans-api-tau.vercel.app |

---

## Deskripsi Umum

Proyek ini merupakan backend API yang dirancang untuk mengelola data peminjaman buku di perpustakaan. Sistem ini mendukung pencatatan peminjaman baru, pencarian berdasarkan status, pembaruan data, serta penghapusan record melalui antarmuka RESTful.

### Tujuan Proyek

- Menyediakan layanan API.
- Menerapkan arsitektur MVC pada pengembangan REST API dengan Node.js.
- Memanfaatkan Supabase sebagai database-as-a-service berbasis PostgreSQL.
- Men-deploy API secara serverless menggunakan Vercel.
- Responsi Praktikum PPB Modul 1.

---

## Tech Stack

| Teknologi | Versi | Keterangan |
| --- | --- | --- |
| Node.js | >= 18.x | Runtime JavaScript |
| Express.js | ^5.2.1 | Web framework |
| Supabase JS | ^2.117.2 | Database client (PostgreSQL) |
| dotenv | ^18.0.5 | Manajemen environment variable |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |
| nodemon | ^3.1.14 | Auto-reload saat development |
| Vercel | - | Platform deployment serverless |

---

## Struktur Proyek

```
library-loan-api/
├── api/
│   └── index.js            # Entry point aplikasi dan konfigurasi Express
├── config/
│   └── supabase.js         # Inisialisasi koneksi Supabase client
├── controllers/
│   └── loanController.js   # Logika bisnis untuk setiap endpoint
├── routes/
│   └── loanRoutes.js       # Definisi routing endpoint
├── .env                    # Environment variables (tidak di-commit)
├── .gitignore
├── package.json
├── vercel.json             # Konfigurasi deployment Vercel
└── README.md
```

---

## Struktur Data / Schema

Data peminjaman disimpan pada tabel `loans` di Supabase dengan skema sebagai berikut:

| Kolom | Tipe Data | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key, auto-generated |
| `member_name` | varchar | Nama anggota peminjam (wajib diisi) |
| `book_title` | varchar | Judul buku yang dipinjam (wajib diisi) |
| `loan_date` | date | Tanggal peminjaman |
| `return_date` | date | Tanggal pengembalian |
| `status` | varchar | Status peminjaman, contoh: `dipinjam`, `dikembalikan` |
| `created_at` | timestamptz | Waktu data dibuat, auto-generated |

### Contoh Data

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "member_name": "Budi Santoso",
  "book_title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "loan_date": "2026-10-01",
  "return_date": "2026-10-15",
  "status": "dipinjam",
  "created_at": "2026-10-01T08:00:00.000Z"
}
```

---

## Daftar Endpoint API

Base URL: `https://library-loans-api-tau.vercel.app`

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/api/loans` | Mengambil semua data peminjaman |
| GET | `/api/loans?status={value}` | Filter peminjaman berdasarkan status |
| GET | `/api/loans/:id` | Mengambil data peminjaman berdasarkan ID |
| POST | `/api/loans` | Menambahkan data peminjaman baru |
| PUT | `/api/loans/:id` | Memperbarui data peminjaman berdasarkan ID |
| DELETE | `/api/loans/:id` | Menghapus data peminjaman berdasarkan ID |

---

## Contoh Request dan Response

### GET /api/loans

Mengambil seluruh data peminjaman.

**Request**
```
GET /api/loans
```

**Response 200 OK**
```json
{
  "success": true,
  "message": "Berhasil mengambil data peminjaman",
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "member_name": "Budi Santoso",
      "book_title": "Clean Code",
      "loan_date": "2026-10-01",
      "return_date": "2026-10-15",
      "status": "dipinjam",
      "created_at": "2026-10-01T08:00:00.000Z"
    }
  ]
}
```

---

### GET /api/loans?status=dipinjam

Mengambil data peminjaman dengan filter status.

**Request**
```
GET /api/loans?status=dipinjam
```

**Response 200 OK** — sama dengan respons GET all loans, namun hanya berisi data dengan status yang sesuai.

---

### GET /api/loans/:id

Mengambil satu data peminjaman berdasarkan ID.

**Request**
```
GET /api/loans/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response 200 OK**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "member_name": "Budi Santoso",
    "book_title": "Clean Code",
    "loan_date": "2026-10-01",
    "return_date": "2026-10-15",
    "status": "dipinjam",
    "created_at": "2026-10-01T08:00:00.000Z"
  }
}
```

**Response 404 Not Found**
```json
{
  "success": false,
  "message": "Data peminjaman tidak ditemukan"
}
```

---

### POST /api/loans

Menambahkan data peminjaman baru.

**Request**
```
POST /api/loans
Content-Type: application/json
```

**Request Body**
```json
{
  "member_name": "Siti Rahayu",
  "book_title": "The Pragmatic Programmer",
  "loan_date": "2026-10-06",
  "return_date": "2026-10-20",
  "status": "dipinjam"
}
```

**Response 201 Created**
```json
{
  "success": true,
  "message": "Peminjaman berhasil dicatat",
  "data": {
    "id": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    "member_name": "Siti Rahayu",
    "book_title": "The Pragmatic Programmer",
    "loan_date": "2026-10-06",
    "return_date": "2026-10-20",
    "status": "dipinjam",
    "created_at": "2026-10-06T09:00:00.000Z"
  }
}
```

**Response 400 Bad Request** (field wajib tidak diisi)
```json
{
  "success": false,
  "message": "member_name dan book_title wajib diisi"
}
```

---

### PUT /api/loans/:id

Memperbarui data peminjaman berdasarkan ID.

**Request**
```
PUT /api/loans/f9e8d7c6-b5a4-3210-fedc-ba9876543210
Content-Type: application/json
```

**Request Body**
```json
{
  "status": "dikembalikan",
  "return_date": "2026-10-18"
}
```

**Response 200 OK**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diperbarui",
  "data": {
    "id": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    "member_name": "Siti Rahayu",
    "book_title": "The Pragmatic Programmer",
    "loan_date": "2026-10-06",
    "return_date": "2026-10-18",
    "status": "dikembalikan",
    "created_at": "2026-10-06T09:00:00.000Z"
  }
}
```

**Response 404 Not Found**
```json
{
  "success": false,
  "message": "Data tidak ditemukan atau gagal diperbarui"
}
```

---

### DELETE /api/loans/:id

Menghapus data peminjaman berdasarkan ID.

**Request**
```
DELETE /api/loans/f9e8d7c6-b5a4-3210-fedc-ba9876543210
```

**Response 200 OK**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus"
}
```

**Response 404 Not Found**
```json
{
  "success": false,
  "message": "Data tidak ditemukan atau gagal dihapus"
}
```

---

## Panduan Instalasi dan Menjalankan Lokal

### Prasyarat

- Node.js versi 18 atau lebih tinggi
- npm (sudah termasuk bersama Node.js)
- Akun Supabase dengan project aktif dan tabel `loans` yang sudah dikonfigurasi

### Langkah Instalasi

**1. Clone repository**

```bash
git clone https://github.com/finaaprilia/library-loans-API.git
cd library-loans-API
```

**2. Install dependensi**

```bash
npm install
```

**3. Konfigurasi environment variable**

Buat file `.env` di root direktori proyek dengan isi berikut:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key
PORT=3000
```

Nilai `SUPABASE_URL` dan `SUPABASE_KEY` dapat ditemukan pada dashboard Supabase melalui menu **Project Settings > API**.

**4. Jalankan server (mode development)**

```bash
npm run dev
```

**5. Jalankan server (mode production)**

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`.

---

## Deployment

API ini di-deploy secara serverless menggunakan Vercel dengan konfigurasi berikut pada file `vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/index.js" }]
}
```

Base URL Deployment: `https://library-loans-api-tau.vercel.app`