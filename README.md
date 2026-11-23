# Applitools Eyes demo: Wikipedia

One Playwright test that visually checks a demo copy of Wikipedia with Applitools Eyes. It's the test used in the Eyes hands-on guide.

## Requirements

- Node.js 20 or newer
- An Applitools API key (Eyes dashboard, account menu, **My API key**)

## Setup

Set your API key first, then install. The install also downloads Playwright's Chromium browser.

macOS / Linux:

```bash
export APPLITOOLS_API_KEY=<your-api-key>
npm install
```

Windows (PowerShell):

```powershell
$env:APPLITOOLS_API_KEY="<your-api-key>"
npm install
```

You can also copy `.env.example` to `.env` and put the key there.

If your npm is set to skip install scripts (`ignore-scripts`), download the browser yourself with `npx playwright install chromium`.

On Linux, if Chromium fails to start because of missing system libraries, run `npx playwright install --with-deps chromium`.

## Run

```bash
npm test
```

Run it twice with the same API key. The first run saves the baseline. The second run is compared against it, after you switch the demo site's version in the guide. Differences don't fail the run: you review them in the Eyes dashboard.

## What the test does

[tests/search.spec.ts](tests/search.spec.ts) opens the demo site's portal page, takes a visual checkpoint (`Portal page`), searches for "functional testing", and takes a second checkpoint (`Functional testing page`).

[playwright.config.ts](playwright.config.ts) tells the Ultrafast Grid to render each checkpoint on 5 environments: Chrome and Firefox at 1200x800 and 768x1024, and a Galaxy S25 Ultra in portrait.

The test opens your own copy of the demo site (`?uid=`, a hash of your API key) and uses the same value as the Eyes app name, so your runs and baselines stay separate from everyone else's. That part is specific to this demo and isn't something to copy into your own tests.
