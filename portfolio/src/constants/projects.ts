import type { Project } from '@/types/project'

/**
 * Projects shown on Home and in the Projects carousel, in display order.
 *
 * Media files go in `public/images/projects/<slug>/`, then get listed in `media`, e.g.
 *   { type: 'image', file: 'home.png', alt: 'Home screen with mock data' }
 *   { type: 'video', file: 'demo.mp4', poster: 'demo-poster.png', alt: 'Demo of a voice call' }
 *
 * Public content only: never add hostnames, IPs, ports, paths, keys or anything that
 * identifies a server.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'chat-app-friends',
    title: 'ChatAppFriends',
    framework: 'Vue',
    language: 'TypeScript',
    status: 'In use',
    summary:
      'A self-hosted voice, text and image chat for a small group of friends, like a small private Discord running on my own server. Messages and images are end-to-end encrypted in the browser, so the server only stores ciphertext.',
    highlights: [
      'End-to-end encrypted channels, images and direct messages',
      'Voice channels with mute, deafen and speaking indicators',
      'Discord-style roles and permissions, plus role-restricted channels',
      'Mentions, link previews, notifications and a live member list',
      'Installable on phones and computers as a web app',
      'Image uploads up to 1 GB with progress and cancel',
    ],
    stack: ['Vue 3', 'Pinia', 'Vue Router', 'Node.js', 'Express', 'Socket.IO', 'mediasoup', 'MariaDB', 'MongoDB', 'nginx'],
    sections: [
      {
        title: 'Architecture',
        points: [
          'npm workspaces monorepo with a Vue client and a Node.js server, both in TypeScript.',
          'Layered backend: routes, controllers, services and models, each with one responsibility.',
          'Relational data (accounts, roles, channels) lives in MariaDB, and the message history in MongoDB.',
          'Voice is routed through a mediasoup SFU, so each person sends their audio once.',
        ],
      },
      {
        title: 'Privacy by design',
        points: [
          'Encryption and decryption only happen in the browser. The server never sees plain text.',
          'A restricted channel’s key only goes to members with the right role.',
          'Removing a member rotates the key, so they cannot read anything new.',
          'A recovery key saved at sign-up restores access after a forgotten password.',
        ],
      },
      {
        title: 'Deployment',
        points: [
          'Runs on my self-hosted Arch Linux server, reachable only through a private VPN.',
          'The backend runs as a systemd service; nginx serves the frontend over HTTPS.',
          'Schema changes go through an explicit migration command, tested on a copy first.',
        ],
      },
    ],
    media: [],
    repoUrl: 'https://github.com/dansecan25/ChatAppFriends',
  },
  {
    slug: 'family-chat-secure',
    title: 'Family Chat Secure',
    framework: 'React + Tauri',
    language: 'TypeScript',
    status: 'In use',
    summary:
      'A small private messenger for my family, with text, pictures and voice calls. It only works inside a private VPN network, so nobody outside the family can reach it, and it installs on tablets and phones like a native app.',
    highlights: [
      'Peer-to-peer voice calls with WebRTC, encrypted end to end',
      'Swipe or long-press a message to reply to it',
      'Push notifications for messages and calls, even with the app closed',
      'Login with one-time codes created by an admin, no passwords to remember',
      'One React codebase for the web app, desktop, Android and iOS',
    ],
    stack: ['React 19', 'Vite', 'Tauri 2', 'Rust', 'Node.js', 'Fastify', 'WebSocket', 'SQLite', 'Web Push', 'GitHub Actions'],
    sections: [
      {
        title: 'Architecture',
        points: [
          'A shared package defines the types and limits that the app and backend both use, so there is one API contract.',
          'Fastify serves the REST API and a WebSocket hub for live messages and call signaling.',
          'SQLite is built into Node, so the backend has no native dependencies to compile.',
          'Call audio goes directly between the two devices and never passes through the server.',
        ],
      },
      {
        title: 'Security model',
        points: [
          'Only devices inside the private network can reach the server.',
          'Login codes and session tokens are stored only as hashes, and login attempts are rate-limited.',
          'Pictures can only be downloaded by their sender and recipient.',
          'The service runs as its own unprivileged user, and restarts itself when its TLS certificate is renewed.',
        ],
      },
      {
        title: 'Building for iOS without a Mac',
        points: [
          'The recommended iPad install is the web app added to the Home Screen, with notifications and calls.',
          'For a native build, a GitHub Actions workflow builds and signs the Tauri iOS app on a hosted macOS runner and uploads it to TestFlight.',
          'Android and desktop builds work fully from Linux.',
        ],
      },
    ],
    media: [],
  },
  {
    slug: 'terminal-omega',
    title: 'TerminalOmega',
    framework: 'egui',
    language: 'Rust',
    status: 'Released',
    summary:
      'A terminal app for people who manage servers while working locally. Connect to a saved SSH session and btop opens for that server automatically, next to a normal local terminal for editing code or running tools.',
    highlights: [
      'One-click saved SSH sessions, including aliases from the SSH config',
      'The btop pane follows the selected server tab',
      'btop reuses the main connection through OpenSSH multiplexing, so there is only one login',
      'Optional passwords are encrypted in the system keychain, never in the config file',
      'True color, mouse reporting, scrollback, clickable links and themes',
      'Updates itself from GitHub Releases',
    ],
    stack: ['Rust', 'egui / eframe', 'alacritty_terminal', 'OpenSSH', 'System keychain', 'GitHub Actions'],
    sections: [
      {
        title: 'Automated releases',
        points: [
          'Pushing a version tag such as v1.2.3 starts a GitHub Actions workflow. Existing tags can be rebuilt by hand from the Actions tab.',
          'The first step checks that the tag matches the version in Cargo.toml, so a release can never ship the wrong version.',
          'A build matrix runs on Linux x86_64, macOS Apple Silicon and macOS Intel. Linux builds on the oldest available Ubuntu, so the binary runs on as many glibc versions as possible.',
          'Every platform runs the same release.sh script used locally: it runs the tests, builds in release mode and packages a tar.gz with an installer.',
          'On macOS the script assembles a .app bundle, generates the icon set and signs it ad hoc, because Apple Silicon refuses unsigned bundles.',
          'Platforms fail independently. A final job creates a draft release if needed and attaches whatever was built, and a re-run fills in any missing package.',
          'The workflow token is read-only by default, and only the release job gets write access.',
        ],
      },
      {
        title: 'Self-update',
        points: [
          'The app checks GitHub Releases at startup and every 12 hours, and downloads the right package in the background.',
          'When it is ready, the top bar offers Install and then Restart now, or Later to keep working.',
          'Sessions and settings are kept across updates.',
        ],
      },
      {
        title: 'Install',
        points: [
          'The installer works per user and does not need sudo.',
          'It adds the app to the application menu on Linux, and to Applications on macOS.',
        ],
      },
    ],
    media: [],
    repoUrl: 'https://github.com/dansecan25/TerminalOmega',
  },
  {
    slug: 'expense-planner',
    title: 'Expense Planner',
    framework: 'React Native',
    language: 'JavaScript',
    status: 'In development',
    summary:
      'A personal cash-flow planner. It shows how much money is available before the next payday, records past and future movements, and warns ahead of time when a planned expense would leave an account below zero.',
    highlights: [
      'Projects balances up to two years ahead and warns before they go negative',
      'Fixed salary schedules with income tax and social security deductions, or variable income',
      'Multiple accounts, transfers, tags, subscriptions and recurring movements',
      'Savings groups, with tracking of how saved money was spent',
      'Optional “inflated” amounts that plan with a safety margin',
      'Works fully offline, with JSON backup and restore',
    ],
    stack: ['React Native', 'MobX-State-Tree', 'React Navigation', 'SQLite (Nitro)', 'Jest'],
    sections: [
      {
        title: 'Planning engine',
        points: [
          'The balance on any date is the starting balance plus the income and minus the expenses up to that date, including future scheduled ones.',
          'Recurring movements expand into their dates inside the projection window, and handle short months correctly.',
          'Before saving a new expense, the app checks its effect on the next six months, and lets you cancel or add it anyway.',
        ],
      },
      {
        title: 'Offline first',
        points: [
          'A local SQLite database is the single source of truth, and nothing leaves the phone.',
          'Existing installations are migrated in place when new tables or columns are added.',
          'A JSON export contains every table, and importing one is validated and confirmed before it replaces the data.',
        ],
      },
      {
        title: 'Interface',
        points: [
          'In-house components for dropdowns, the date picker and inputs keep the look consistent.',
          'Light, dark or system appearance, and translations through an i18n layer.',
        ],
      },
    ],
    media: [],
  },
  {
    slug: 'music-player',
    title: 'Music Player',
    framework: 'Flutter',
    language: 'Dart',
    status: 'In development',
    summary:
      'A cross-platform music player built with Flutter, targeting Android, iOS, desktop and web from one codebase. It is at an early stage: the app shell and theming are in place, and playback features are next.',
    highlights: [
      'One Dart codebase for mobile, desktop and web',
      'Light and dark themes defined in one place',
      'Material Design components',
    ],
    stack: ['Flutter', 'Dart', 'Material Design'],
    sections: [
      {
        title: 'Roadmap',
        points: [
          'Browse and play local music files.',
          'Playlists and a queue.',
          'Background playback with media controls.',
        ],
      },
    ],
    media: [],
  },
  {
    slug: 'home-server',
    title: 'Home Server',
    framework: 'Arch Linux',
    language: 'Bash · systemd',
    status: 'In use',
    summary:
      'A headless Arch Linux server I set up and maintain to host my own projects. It has no desktop, is managed entirely over SSH, and is only reachable through a private VPN, so nothing is exposed to the public internet.',
    highlights: [
      'Minimal Arch Linux install, managed over SSH with key-only login',
      'No ports open to the internet: all access goes through a private WireGuard-based VPN',
      'Each app runs as a hardened systemd service',
      'Trusted HTTPS certificates that renew automatically',
      'Self-healing network and scheduled database backups',
    ],
    stack: ['Arch Linux', 'systemd', 'OpenSSH', 'WireGuard VPN', 'nginx', 'Node.js', 'MariaDB', 'MongoDB', 'Bash'],
    sections: [
      {
        title: 'How it is used',
        points: [
          'It hosts my self-hosted apps, such as ChatAppFriends and Family Chat Secure.',
          'It also hosts databases that my own devices use for development.',
          'Only my own devices and invited friends can reach it, and every service still requires its own login.',
        ],
      },
      {
        title: 'How it is configured',
        points: [
          'App backends and databases listen only on the private VPN interface or on localhost, never on the home network or the internet.',
          'Each app runs as a systemd service with a restart policy and sandboxing options. New apps get their own unprivileged user.',
          'nginx serves the web frontends over HTTPS, each under its own route, with strict security headers.',
          'The databases use one least-privilege account per app, and admin accounts only accept connections from specific devices.',
          'systemd timers renew certificates, watch the network connection and run backups. Services restart by themselves when a certificate changes.',
        ],
      },
      {
        title: 'Lessons learned',
        points: [
          'Run security-sensitive changes with a second SSH session open, so a mistake cannot lock you out.',
          'A healthy health check does not prove the app works. Always test real sign-ins from another device.',
          'Check prebuilt native binaries against the CPU, and compile them on the server when needed.',
          'Back up off the machine. A backup on the same disk does not survive the disk failing.',
        ],
      },
    ],
    media: [],
  },
]

export const findProject = (slug: string | undefined): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug)
