import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost",
    port: 4173,
  },
  testDir: "e2e",
  reporter: "html",
  outputDir: "playwright-report",
});
