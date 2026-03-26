This is the Next.js fullstack target for the CMS migration.

## Stack

- Next.js App Router
- SQLite + Prisma ORM
- NextAuth (Credentials, admin login)
- Local upload storage in `public/uploads`

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create database and seed

```bash
npm run prisma:migrate -- --name init
npm run prisma:seed
```

3. Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Demo Login

- Email: `admin@desapujungan.bali`
- Password: `admin123`

## Notes

- Existing Vite frontend source is copied into `src/legacy` for staged migration.
- Legacy single image (`foto_url`) is seeded into the new multi-image table as the first image.
- Upload endpoint accepts multiple files via `POST /api/uploads` field name `files`.

## Current Implemented Endpoints

- `GET/POST /api/temples`
- `GET/PATCH/DELETE /api/temples/:id`
- `GET/POST /api/categories`
- `POST /api/uploads`
- `GET/POST /api/auth/[...nextauth]`

Next step is replacing pages in `src/legacy/pages` with App Router pages one by one.
