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

      return Response.json({ ok: true, name: 'nano-vibe' });
    },
  });

  log.info(`Server running at http://localhost:${server.port}`);
  return { server };
}
