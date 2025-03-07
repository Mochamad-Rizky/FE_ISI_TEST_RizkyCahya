# Task Management System Frontend

A Next.js frontend application for interacting with the Task Management System API.

## Technology Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- React Query for data fetching
- NextAuth.js for authentication
- Axios for API requests

## Setup Instructions

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
NEXT_PUBLIC_BASE_API=http://localhost:3001
NEXTSERVER_BASE_API=http://webapp:3001
NEXTAUTH_SECRET=wxgx/YQGxFGHSiumQZMssWYxVHuCyoeiq8kONFqL+wE=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_HOST_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

5. The application will be accessible at `http://localhost:3000`

## Using Docker

If you're using Docker with the backend service:

```bash
# Connect frontend to the backend network
docker network connect task-management-system-pt-ihsan_stagingnetwork frontend
```

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code with Prettier
npm run format
```
