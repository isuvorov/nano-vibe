# nano-vibe

TypeScript HTTP API на Bun.
## Quick Start

```bash
bun install          # Установка зависимостей
bun run dev          # Dev сервер с hot reload (порт 3000)
bun run test             # Запуск тестов и линта
bun run test:lint # Run only lints
bun run test:type # check types
bun run test:unit # Run only unit tests
bun run fix # fix lint and other
```

## Структура

```
src/
├── config.ts        # ENV конфигурация и валидация (Zod)
├── index.ts         # Экспорт функций (add и др.)
└── main.ts          # Точка входа
tests/
├── index.test.ts    # Unit тесты
└── server.test.ts   # API тесты
```

## API

```
GET /add?a=10&b=5  →  {"result": 15}
```

## Deploy

```bash
fly deploy           # Деплой на Fly.io
```



**Important:**
- Update this file after each project change
- Run bun run fix if all ok run `bun run test` after each code change 

## Подробнее

Полные гайдлайны проекта: [docs/guideline.md](docs/guideline.md)
