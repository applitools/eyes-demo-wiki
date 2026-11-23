import { test } from '@applitools/eyes-playwright/fixture';
import { createHash } from 'node:crypto';

// Your own copy of the demo site. The uid only gives each user a separate copy of the demo,
// so your runs and version switches don't mix with anyone else's. It's not a pattern to copy
// into your own tests.
const uid = createHash('md5').update(process.env.APPLITOOLS_API_KEY ?? '').digest('hex');
const DEMO_SITE = `https://wikipedia-demo.applitools.com/?uid=${uid}`;

// The same uid is the Eyes app name, so your baselines stay separate from other users'.
// The browsers and devices are set in playwright.config.ts.
test.use({ eyesConfig: { appName: uid } });

test('Search for "functional testing"', async ({ page, eyes }) => {
  await page.goto(DEMO_SITE);
  await eyes.check('Portal page');

  await page.locator('#searchInput').fill('functional testing');
  await page.locator('#search-form button[type="submit"]').click();
  await page.waitForURL('**/wiki/Functional_testing**');
  await eyes.check('Functional testing page');
});
