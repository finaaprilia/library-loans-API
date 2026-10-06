# Library Loan Management REST API

REST API sederhana untuk layanan pencatatan peminjaman buku perpustakaan yang dibangun menggunakan Node.js, Express.js, dan Supabase sebagai databasenya. Proyek ini di-deploy dan dapat diakses publik melalui Vercel.

## Live Demo & Base URL
Base URL Vercel: `https://[nama-app-kamu].vercel.app`
Endpoint Utama: `https://[nama-app-kamu].vercel.app/api/loans`

---

## Tech Stack
Runtime: Node.js
Framework: Express.js
Database: Supabase (PostgreSQL)
Deployment: Vercel

---

## Database Schema

Tabel `loans` pada Supabase dibuat menggunakan skema SQL berikut:

CREATE TABLE loans (
  id BIGSERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  return_date DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'Dipinjam',
  created_at TIMESTAMPTZ DEFAULT NOW()
);