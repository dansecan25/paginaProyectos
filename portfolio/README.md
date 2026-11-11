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

### To update the webpage
Push the changes
Then run 
```sh
npm run deploy
```

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
| Music Player | `music-player` |
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
