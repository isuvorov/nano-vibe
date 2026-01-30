import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { add } from '../src/index.ts';

const PORT = 3001;
let server: ReturnType<typeof Bun.serve>;

beforeAll(() => {
  server = Bun.serve({
    port: PORT,
    fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === '/add') {
        const a = Number(url.searchParams.get('a'));
        const b = Number(url.searchParams.get('b'));

        if (Number.isNaN(a) || Number.isNaN(b)) {
          return Response.json({ error: 'Invalid parameters. Use ?a=1&b=2' }, { status: 400 });
        }

        return Response.json({ result: add(a, b) });
      }

      return Response.json({ error: 'Not found. Try /add?a=1&b=2' }, { status: 404 });
    },
  });
});

afterAll(() => {
  server.stop();
});

describe('server /add', () => {
  test('adds two numbers', async () => {
    const res = await fetch(`http://localhost:${PORT}/add?a=2&b=3`);
    const data = await res.json();
    expect(data).toEqual({ result: 5 });
  });

  test('handles negative numbers', async () => {
    const res = await fetch(`http://localhost:${PORT}/add?a=-5&b=3`);
    const data = await res.json();
    expect(data).toEqual({ result: -2 });
  });

  test('returns 400 for invalid params', async () => {
    const res = await fetch(`http://localhost:${PORT}/add?a=foo&b=2`);
    expect(res.status).toBe(400);
  });

  test('returns 404 for unknown route', async () => {
    const res = await fetch(`http://localhost:${PORT}/unknown`);
    expect(res.status).toBe(404);
  });
});
