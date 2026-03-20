import { access } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { spawn } from "node:child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const tscPath = path.join(rootDir, "node_modules", ".bin", "tsc")

try {
  await access(tscPath)
  // TypeScript is installed, run type check
  console.log("[build] Running TypeScript type check...")
  const tsc = spawn(tscPath, ["-b"], {
    cwd: rootDir,
    stdio: "inherit",
    shell: true
  })
  
  tsc.on("close", (code) => {
    process.exit(code)
  })
} catch {
  // TypeScript not installed, skip type check
  console.warn("[build] TypeScript not found, skipping type check. Vite will handle type checking during build.")
  process.exit(0)
}



