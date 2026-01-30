import { add } from './add.ts';
import { port } from './config.ts';
import { log } from './log.ts';

export function main() {
  const server = Bun.serve({
    port: port ?? 8080,
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

      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>nano-vibe</title>
</head>
<body>
  <h1>nano-vibe</h1>
  <p>API: <code>GET /add?a=10&b=5</code></p>
</body>
</html>`,
        { headers: { 'Content-Type': 'text/html' } },
      );
    },
  });

  log.info(`Server running at http://localhost:${server.port}`);
  return { server };
}
