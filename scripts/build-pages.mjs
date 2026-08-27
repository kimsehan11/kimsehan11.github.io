import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), process.argv.includes("--dev") ? "dev" : "build", "--webpack"],
  {
    cwd: root,
    env: {
      ...process.env,
      PORTFOLIO_GITHUB_PAGES: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: "inherit",
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
