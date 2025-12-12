import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"], // src 전체
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  outDir: "dist",
  clean: true
});
