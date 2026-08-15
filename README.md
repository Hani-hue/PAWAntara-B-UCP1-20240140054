# Toko Sembako Ariesta — Website & REST API

Website toko sembako fiktif dengan fitur katalog produk, dashboard admin (CRUD produk), dan fitur Tanya AI seputar produk. Dibangun sebagai tugas UCP 1 mata kuliah Pemrograman Aplikasi Web (PAW).

## Identitas
- **Nama:** Isna Habibah Ramadhani
- **NIM:** 20240140054

## Cara Menjalankan Secara Lokal

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` di root project, isi dengan:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
4. Jalankan server:
   ```bash
   npm run dev
   ```
5. Buka browser ke `http://localhost:3000`

## Kredensial Akun Admin

Untuk keperluan pengecekan asisten, login ke dashboard admin di `/login` menggunakan:

- **Username:** `admin`
- **Password:** `admin123`

## Penjelasan Tampilan (UI)

<img width="1920" height="1200" alt="beranda" src="https://github.com/user-attachments/assets/492c852c-8c28-460f-afaa-e2baebd3294c" />
| Beranda | `/` | Landing page toko, menampilkan info umum dan navigasi ke halaman lain. |


<img width="1920" height="1200" alt="daftar produk" src="https://github.com/user-attachments/assets/9aa05a9c-2111-48ce-8dad-2c245a7cf1b6" />
| Daftar Produk | `/produk` | Menampilkan katalog seluruh produk sembako yang dijual, publik (tanpa login). |


<img width="1920" height="1200" alt="detail produk" src="https://github.com/user-attachments/assets/316174cf-bef2-4146-b4c3-ad6fdaa9c4f8" />
| Detail Produk | `/produk/:id` | Menampilkan detail satu produk berdasarkan ID. |


<img width="1920" height="1200" alt="tanya-ai" src="https://github.com/user-attachments/assets/57aee58b-a7c6-4d8f-9e0a-9098fc536d8c" />
| Tanya AI | `/tanya-ai` | Halaman chat untuk bertanya seputar produk (jam buka, ongkir, pembayaran, stok). |


<img width="1920" height="1200" alt="login admin" src="https://github.com/user-attachments/assets/a1b4f2d0-26a5-46e5-9f68-6c752c544a15" />
| Login | `/login` | Form login untuk admin/kasir. |


<img width="1920" height="1200" alt="dashboard1" src="https://github.com/user-attachments/assets/630cff58-f2b2-4029-83ce-86220134f47e" />
<img width="1920" height="1200" alt="dashboard2" src="https://github.com/user-attachments/assets/582c0b81-8202-4252-84a7-99aa9f82d6ef" />
| Dashboard Produk | `/dashboard` | Halaman admin untuk tambah, ubah, dan hapus produk. Dilindungi middleware auth — hanya bisa diakses setelah login. |

## Daftar Endpoint API

### Auth
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/login` | Login admin, membuat session jika kredensial valid. Body: `{ username, password }`. |
| POST | `/api/logout` | Logout, menghapus session. |

### Produk
| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/api/products` | Publik | Ambil semua produk. Bisa difilter lewat query `?kategori=` dan `?search=`. |
| GET | `/api/products/:id` | Publik | Ambil satu produk berdasarkan ID. |
| POST | `/api/products` | Wajib login | Tambah produk baru. Body: `{ name, category, price, stock }`. |
| PUT | `/api/products/:id` | Wajib login | Update produk berdasarkan ID. Body sama seperti POST. |
| DELETE | `/api/products/:id` | Wajib login | Hapus produk berdasarkan ID. |

### Chat AI
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/chat` | Kirim pesan ke fitur Tanya AI. Body: `{ message }`. Balasan berbasis rule sederhana (deteksi kata kunci seperti jam buka, ongkir, pembayaran, stok) — bukan model AI eksternal. |

## Format Response API

Mengikuti kontrak yang seragam di seluruh endpoint:

```json
{
  "status": "success",
  "message": "Pesan opsional",
  "data": { }
}
```

## Struktur Project

```
controllers/   → Logic HTTP handler tiap fitur
models/        → CRUD di atas data (array in-memory)
validators/    → Aturan validasi input
routes/        → Definisi endpoint & routing
middleware/    → Auth & logger custom
data/          → Data mentah (array produk, kredensial admin)
views/         → Template EJS + partials
public/        → CSS & JS client-side
```

## Catatan Teknis

- Data disimpan di array in-memory (sesuai ketentuan tugas), bukan database.
- Password admin di-hash menggunakan bcrypt, tidak disimpan plain text.
- Kredensial admin diambil dari environment variable (`.env`), tidak di-hardcode di kode yang ter-commit.
- Autentikasi berbasis session (`express-session`).
- Styling menggunakan CSS murni (custom), bukan framework CSS.
- Fitur "Tanya AI" menggunakan logic rule-based (bukan integrasi model AI eksternal).
