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

## Game Configuration

The game is configured via `src/data/gameConfig.json`. You can customize rewards and questions without changing any code.

### Rewards

The `rewards` array defines the prize for each question level. Rewards must:

- Be strings in dollar format (e.g. `"$500"`, `"$1,000"`, `"$1,000,000"`)
- Be ordered from lowest to highest
- Have the same number of entries as there are questions

```json
{
  "rewards": ["$500", "$1,000", "$2,000", "$4,000"]
}
```

### Questions

The `questions` array defines each question. You can have any number of questions (as long as it matches the rewards count). Each question supports:

- **2 or more answer options** (not limited to 4)
- **Multiple correct answers**

```json
{
  "questions": [
    {
      "id": "q1",
      "text": "Which of these are prime numbers?",
      "answers": [
        { "id": "A", "text": "2" },
        { "id": "B", "text": "4" },
        { "id": "C", "text": "7" },
        { "id": "D", "text": "9" },
        { "id": "E", "text": "11" }
      ],
      "correctAnswerIds": ["A", "C", "E"]
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `id` | Unique question identifier |
| `text` | The question text |
| `answers` | Array of answer options, each with an `id` (single capital letter) and `text` |
| `correctAnswerIds` | Array of answer `id` values that are correct (at least one) |
