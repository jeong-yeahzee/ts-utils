import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true, // 타입 자동 생성
  clean: true,
  format: ["esm", "cjs"]
});
