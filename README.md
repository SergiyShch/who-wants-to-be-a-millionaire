# Who Wants to Be a Millionaire

A "Who Wants to Be a Millionaire" game built with Next.js, React, and TypeScript.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Jest** + React Testing Library
- **ESLint** + **Prettier**
- Plain CSS (no frameworks)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start development server     |
| `npm run build`      | Create production build      |
| `npm start`          | Start production server      |
| `npm run lint`       | Run ESLint                   |
| `npm run format`     | Format code with Prettier    |
| `npm run format:check` | Check formatting           |
| `npm test`           | Run tests                    |
| `npm run test:watch` | Run tests in watch mode      |

## Project Structure

```
src/
└── app/
    ├── layout.tsx      # Root layout
    ├── page.tsx         # Home page
    └── globals.css      # Global styles
```
