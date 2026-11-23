import { defineConfig, devices } from '@playwright/test';
import type { EyesFixture } from '@applitools/eyes-playwright/fixture';

// Optional: read APPLITOOLS_API_KEY from a local .env file if there is one.
// Exporting the key in your shell works just as well.
try {
  process.loadEnvFile();
} catch {
  // No .env file (or an older Node.js 20 release): use the shell environment.
}

export default defineConfig<EyesFixture>({
  testDir: './tests',
  // The Ultrafast Grid renders 10 checkpoints per run (2 checks x 5 environments).
  timeout: 120_000,
  reporter: 'list',
  use: {
    eyesConfig: {
      apiKey: process.env.APPLITOOLS_API_KEY,
      batch: { name: 'Wikipedia demo' },
      matchLevel: 'Dynamic',
      // Differences are reviewed in the Eyes dashboard, so they don't fail the run.
      failTestsOnDiff: false,
      // The Ultrafast Grid renders each check on every browser and device below, in parallel.
      type: 'ufg',
      browsersInfo: [
        { name: 'chrome', width: 1200, height: 800 },
        { name: 'chrome', width: 768, height: 1024 },
        { name: 'firefox', width: 1200, height: 800 },
        { name: 'firefox', width: 768, height: 1024 },
        { chromeEmulationInfo: { deviceName: 'Galaxy S25 Ultra', screenOrientation: 'portrait' } },
      ],
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
