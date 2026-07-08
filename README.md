# WWW.CSBLAWPDX.COM

> A modern, single-page, static website provided for the Law Offices of Carson, Seegmuller & Baker LLP.

## ✨ Features

- 🚀 **Fast Development** - Vite build tool with HMR
- 🎨 **Modern UI Components** - Lit web components with Flowbite design patterns
- 💨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Testing** - Vitest (node/jsdom) + Playwright browser tests
- 📱 **Mobile-First** - Responsive design approach
- ⚡ **Single Page App** - Client-side navigation with smooth transitions
- 🔧 **Developer Experience** - ESLint, PostCSS
- ♿ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## 🏗️ Tech Stack

### Core Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - No framework dependencies
- **Lit** - Lightweight web components

### Development Tools

- **Vite** - Build tool and dev server
- **Vitest** - Testing framework (node + browser via Playwright)
- **Playwright** - Headless Chromium for browser integration tests
- **ESLint** - JavaScript linting
- **PostCSS** - CSS processing

### UI Components

- **Flowbite** - Design system and component patterns
- **Custom Lit Components** - Reusable web components

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- For browser tests (optional): run `npx playwright install chromium` once after `npm install`

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/jaysonharper/static-web-starter-template.git
cd static-web-starter-template

# Install dependencies
npm install

# (Optional) Install Playwright Chromium for browser tests
npx playwright install chromium

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application.

## ⚙️ Environment Variables

This project now relies on a local-only env file and no longer includes a committed `.env.example`.

Create a `.env.local` in the project root (already added to `.gitignore`). Example contents:

```bash
VITE_APP_NAME="www.csblawpdx.com"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENVIRONMENT="development"
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_OFFICE_PHONE="+1-555-LAW-FIRM"
VITE_OFFICE_EMAIL="contact@harperandcats.law"
```

Guidelines:

- Only variables prefixed with `VITE_` are exposed to client code via `import.meta.env`.
- Never place secrets (API keys, tokens) in `VITE_` variables—they are bundled into frontend JavaScript.
- Restart the dev server after adding or renaming variables.
- Use additional env files if needed (`.env.production`, `.env.development`, etc.). Add a `.local` suffix for machine‑specific overrides (already git‑ignored).

const debugEnabled = import.meta.env.VITE_ENABLE_DEBUG === 'true';

````

If you need a template for distribution, you can recreate one manually (e.g. `cp .env.local .env.example` and strip sensitive values) before sharing the project.

## 📜 Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run all tests (node/jsdom + Playwright browser)
- `npm run lint` - Run ESLint

> **Note:** `npm run test` includes browser tests requiring Playwright Chromium. Run `npx playwright install chromium` once after `npm install` to enable them. To run only node/jsdom tests: `npx vitest run --project node`

## 🧩 Available Components

### Flow Button (`<flow-button>`)

```html
<flow-button variant="primary" size="md">Click me</flow-button>
<flow-button variant="success" loading>Processing...</flow-button>
```

**Properties:** `variant` (primary/secondary/success/danger/warning/info), `size` (xs/sm/md/lg/xl), `disabled`, `loading`
**Events:** `flow-click`

---

### Flow Alert (`<flow-alert>`)

```html
<flow-alert type="success" dismissible>
  <strong>Success!</strong> Operation completed.
</flow-alert>
```

**Properties:** `type` (info/success/warning/danger), `dismissible`, `icon`, `visible`
**Events:** `flow-alert-closed`

---

### Flow Call Button (`<flow-call-button>`)

```html
<flow-call-button phone-number="+15032889291" variant="navbar" size="md"></flow-call-button>
```

**Properties:** `phone-number`, `variant` (primary/secondary/hero/navbar), `size` (sm/md/lg/xl), `disabled`, `full-width`
**Events:** `flow-call-click`

---

### Flow Floating Call Button (`<flow-floating-call-button>`)

```html
<flow-floating-call-button phone-number="+15032889291"></flow-floating-call-button>
```

**Properties:** `phone-number`, `visible` (auto-managed), `pinned` (auto-managed — pins above footer)
**Events:** `flow-floating-call-click`

---

### Flow Scroll to Top (`<flow-scroll-to-top>`)

```html
<flow-scroll-to-top></flow-scroll-to-top>
```

**Properties:** `visible` (auto-managed), `pinned` (auto-managed — pins above footer)
**Events:** `flow-scroll-top-click`

---

### Flow Navbar (`<flow-navbar>`)

```html
<flow-navbar></flow-navbar>
```

Fixed top navigation with a hamburger menu pinned to the top-left corner, a centered company logo (click to scroll to top), and section navigation links.

---

### Flow Attorney Card (`<flow-attorney-card>`)

```html
<flow-attorney-card name="Attorney Name" email="attorney@example.com" image="photo.jpg"></flow-attorney-card>
```

**Properties:** `name`, `email`, `image`, `image-alt`, `image-class`, `specialties` (array), `education` (array), `memberships` (array), `admissions` (array), `biography`
**Events:** `card-flip`, `specialty-click`

## 🏗️ Creating New Components

1. Create `src/components/flow-[name].js` extending `LitElement`
2. Register and export in `src/components/index.js`
3. Write co-located tests: `src/components/flow-[name].test.js`
4. Document in `/docs`

## 📁 Project Structure

```
├── docs/                  # Component and feature documentation
├── public/                # Static assets served as-is
├── src/
│   ├── app.main.js        # Application entry point
│   ├── main.test.js       # App-level unit tests
│   ├── main.dom.test.js   # DOM interaction tests (browser)
│   ├── components/        # Lit web components + co-located tests
│   │   ├── flow-alert.js
│   │   ├── flow-attorney-card.js
│   │   ├── flow-button.js
│   │   ├── flow-call-button.js
│   │   ├── flow-floating-call-button.js
│   │   ├── flow-navbar.js
│   │   ├── flow-scroll-to-top.js
│   │   ├── service-highlights.js
│   │   └── index.js       # Component registry & exports
│   └── styles/            # Modular CSS (PostCSS + Tailwind)
│       ├── main.css
│       ├── base/
│       ├── components/
│       ├── layout/
│       └── utilities/
├── tests/
│   ├── unit/index.js      # Component registry smoke tests
│   └── integration/index.js
├── index.html             # Main HTML entry point
├── vite.config.mjs        # Vite configuration
└── vitest.config.js       # Vitest (browser + node projects)
```

## 🎨 Design System

Components follow [Flowbite](https://flowbite.com/) design patterns and use Tailwind CSS utility classes. This ensures:

- **Consistency** across components
- **Accessibility** built-in
- **Responsive** design
- **Dark mode** support
- **Professional** appearance

## 🧪 Testing

```bash
# Run all tests (node + browser)
npm run test

# Run only node/jsdom tests (no Playwright required)
npx vitest run --project node
```

Two test projects are configured in `vitest.config.js`:

| Project | Runner | Includes |
|---|---|---|
| `browser` | Playwright Chromium | `flow-attorney-card.test.js`, `*.dom.test.js` |
| `node` | Node + jsdom | All other `*.test.js` + `tests/**/*.js` |

Test files live alongside their components with a `.test.js` suffix.

> **First-time setup:** Run `npx playwright install chromium` once to enable the browser project.

## 📖 Documentation

- **Live Demo**: `npm run dev` → `http://localhost:5173`
- **Component Docs**: `/docs` directory

## 🚀 Deployment

This template is configured so that when you click "Use this template" and create a new repository, GitHub Pages deployment works without manual edits—CSS and assets will load correctly under your new repo name.

How it works:

- The Vite config derives the correct `base` path from `VITE_BASE_PATH` or the `GITHUB_REPOSITORY` env var inside the GitHub Actions workflow.
- The workflow injects `VITE_BASE_PATH=/your-repo-name/` automatically unless the repo is a root user/org site (`username.github.io`).
- For user/org Pages sites (`*.github.io`), the base is `/`.

User steps after creating a repo from the template: 3. Visit: `https://<your-username>.github.io/<your-repo-name>/` (or root if a `*.github.io` repo).

No need to edit `vite.config.mjs`, scripts, or HTML paths.

### Local Production Build

```bash
npm run build
```

If you need to simulate a different repo name locally:

```bash
VITE_BASE_PATH=/my-custom-repo/ npm run build
```

On Windows PowerShell:

```powershell
$env:VITE_BASE_PATH="/my-custom-repo/"; npm run build
```

### Optional .env.production

Create `.env.production` only if you want to pin a custom base:

```
VITE_BASE_PATH=/custom-path/
```

An example file is provided at `.env.production.example`.



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Run tests: `npm run test`
6. Commit changes: `git commit -am 'Add feature'`
7. Push to branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Lightning fast build tool
- [Lit](https://lit.dev/) - Simple, fast web components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Flowbite](https://flowbite.com/) - Component design patterns
- [Vitest](https://vitest.dev/) - Fast unit testing
- [Playwright](https://playwright.dev/) - Browser automation
````
