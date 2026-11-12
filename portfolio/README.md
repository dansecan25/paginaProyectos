# portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Deploying

Pushing to `main` deploys the site: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
runs the tests, builds the site and publishes it to the `gh-pages` branch. It also runs once a day
to refresh the GitHub activity graph, and by hand from **Actions → Deploy → Run workflow**.

`npm run deploy` still publishes from your machine, but without the activity graph unless the
variables below are set.

### GitHub activity graph

The Links page shows the last year of GitHub contributions. The data is fetched during the deploy
by [`scripts/fetch-github-activity.mjs`](scripts/fetch-github-activity.mjs) into
`public/data/github-activity.json`, which is generated and not committed. Without it, the page
simply hides the graph.

One-time setup: create a [fine-grained token](https://github.com/settings/personal-access-tokens/new)
with **Public repositories (read-only)** access and no other permissions, and save it as the
`ACTIVITY_GITHUB_TOKEN` repository secret (**Settings → Secrets and variables → Actions**).

To see the graph locally:

```sh
ACTIVITY_LOGIN=<github-user> ACTIVITY_GITHUB_TOKEN=<token> node scripts/fetch-github-activity.mjs
npm run dev
```

The graph shows the same contributions as your public GitHub profile. To include private work as
anonymous counts, turn on **Private contributions** in your GitHub profile settings.

## Project screenshots and videos

Projects are defined in `src/constants/projects.ts`. Each one has a media folder:

```
public/images/projects/<slug>/
```

| Project | Folder |
|---|---|
| ChatAppFriends | `chat-app-friends` |
| Family Chat Secure | `family-chat-secure` |
| TerminalOmega | `terminal-omega` |
| Expense Planner | `expense-planner` |
| Cumbionsito Player | `music-player` |
| Home Server | `home-server` |

Drop the file in the folder, then list it in that project's `media` array:

```ts
media: [
  { type: 'image', file: 'home.png', alt: 'Home screen with mock data', caption: 'Home' },
  { type: 'video', file: 'call-demo.mp4', poster: 'call-demo.png', alt: 'Voice call demo' },
],
```

- Images: `.png`, `.jpg` or `.webp`. Videos: `.mp4` (H.264/AAC) or `.webm`, which play in every modern browser.
- A `poster` image is optional, but it shows on the video and as its thumbnail before it loads.
- GitHub rejects files over 100 MB, so keep videos short and compressed.
- Use mock data only, and check that screenshots don't show hostnames, IPs, codes or keys.
