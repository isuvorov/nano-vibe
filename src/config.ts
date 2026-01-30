import 'dotenv/config';

// import { loadConfig } from '@lsk4/config';
import sourceMapSupport from 'source-map-support';
import { z } from 'zod';

sourceMapSupport.install();

const schema = z.object({
  name: z.string(),
  count: z.number().optional(),
  port: z.number().or(z.string()).nullable().optional(),
});

export type Config = z.infer<typeof schema>;

// export const { config } = await loadConfig<Config>('.env', {
//   schema,
//   throwError: true,
// });

export const port = +(process.env.PORT ?? 8080);
