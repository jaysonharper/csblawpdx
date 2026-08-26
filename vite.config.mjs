import { defineConfig, loadEnv } from "vite";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Helper to normalize base path (always leading + trailing slash unless root)
function normalizeBase(base) {
  if (!base || base === "." || base === "/") return "/";
  let b = base.trim();
  if (!b.startsWith("/")) b = "/" + b;
  if (!b.endsWith("/")) b += "/";
  return b;
}

function reviewRedirectMiddleware() {
  return {
    name: "review-redirect-route",
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url === "/review" || request.url?.startsWith("/review?")) {
          const query = request.url.includes("?")
            ? request.url.slice(request.url.indexOf("?"))
            : "";
          request.url = `/review/index.html${query}`;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url === "/review" || request.url?.startsWith("/review?")) {
          const query = request.url.includes("?")
            ? request.url.slice(request.url.indexOf("?"))
            : "";
          request.url = `/review/index.html${query}`;
        }
        next();
      });
    },
  };
}

// Export config with access to mode/env so GitHub Pages workflow can inject VITE_BASE_PATH
export default defineConfig(({ mode }) => {
  // Load all env vars (include those without VITE_ prefix so workflow injection works either way)
  const env = loadEnv(mode, process.cwd(), "");

  // A custom domain (public/CNAME) is served from the site root, so it must
  // always build at base "/" regardless of repo name or any injected base path.
  const cnamePath = resolve(process.cwd(), "public", "CNAME");
  const hasCustomDomain =
    existsSync(cnamePath) && readFileSync(cnamePath, "utf8").trim().length > 0;

  // Priority order for determining base path:
  // 1. Custom domain (public/CNAME present) -> always root '/'
  // 2. Explicit VITE_BASE_PATH (set by GitHub Action or user .env.production)
  // 3. If running in GitHub Actions with GITHUB_REPOSITORY (owner/repo) and repo is not a user/ org site, derive from repo name
  // 4. Root '/'
  let derivedBase = env.VITE_BASE_PATH;

  if (hasCustomDomain) {
    derivedBase = "/";
  } else if (!derivedBase && env.GITHUB_REPOSITORY) {
    const repoName = env.GITHUB_REPOSITORY.split("/").pop();
    // user.github.io style repos should deploy at root
    if (repoName && !repoName.endsWith(".github.io")) {
      derivedBase = `/${repoName}/`;
    } else {
      derivedBase = "/";
    }
  }

  const base = normalizeBase(derivedBase);

  return {
    plugins: [reviewRedirectMiddleware()],

    // Dynamic base for GitHub Pages or other hosting
    base,

    // Build options
    build: {
      outDir: "dist",
      assetsDir: "assets",
      manifest: false, // Set to true if you later need manifest-driven integration
      target: "esnext",
      minify: "esbuild",
      sourcemap: false,
    },

    // Development server options
    server: {
      port: 5173,
      host: true,
      open: true,
    },

    // Preview server options (for testing build)
    preview: {
      port: 5173,
      host: true,
    },
  };
});
