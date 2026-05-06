# Product Management Frontend

React-based frontend for product management built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query (TanStack Query)
- React Hook Form + Zod
- Axios

## Setup & Installation

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:8080`

### Steps

1. Clone the repository and go to frontend folder
```bash
   cd frontend
```

2. Install dependencies
```bash
   npm install
```

3. Copy environment file
```bash
   cp .env.example .env
```

4. Fill in your `.env` values
```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

5. Run the development server
```bash
   npm run dev
```

App runs on `http://localhost:3000`

## Features

- Product list with table view
- Add product form with validation
- Edit product form with pre-filled data
- Delete product with confirmation
- Active/Inactive status toggle
- Loading & error states
- Responsive layout

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
├── components/               # Reusable UI components
├── hooks/                    # React Query hooks
└── package/
    ├── schema/product/       # Zod validation schemas
    └── utilities/
        ├── axiosInstansce/   # Axios instance & config
        ├── services/         # API service functions
        └── types/            # TypeScript types
```