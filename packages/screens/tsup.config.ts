import { defineConfig, Options } from 'tsup';
import { globSync } from 'glob';
import path from 'path';

export default defineConfig((options: Options) => 
  {
    const entryPoints: Record<string, string> = {};

    const entries = globSync("src/**/index.ts");

    entries.forEach((entry) => 
    {
      const relativePath = path.dirname(entry)
        .replace(/^src[/\\]?/, '')
        .replace(/\\/g, '/');
      
      const key = relativePath || 'index';
      const entryKey = key === 'index' ? key : `${key}/index`;
      
      entryPoints[entryKey] = entry;
    });

    return {
      entry: entryPoints,
      outDir: "build",
      banner: {
        js: "'use client'",
      },
      clean: false,
      format: ["cjs", "esm"],
      external: ["react"],
      dts: true,
      sourcemap: true,
      ...options,
    };
});
