// .vitepress/config.mts
import { existsSync } from "node:fs";
import { fileURLToPath as fileURLToPath2, pathToFileURL } from "node:url";
import path from "node:path";
import { createRequire } from "node:module";
import tailwindcss from "file:///Users/joshcrawford/public_html/plugin-kit-2/plugin-kit-repo/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "file:///Users/joshcrawford/public_html/plugin-kit-2/plugin-kit-repo/node_modules/vitepress/dist/node/index.js";

// ../plugin-kit-react/vite-dev.mjs
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///Users/joshcrawford/public_html/plugin-kit-2/plugin-kit-repo/plugin-kit-react/vite-dev.mjs";
var __dirname = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var srcRoot = resolve(__dirname, "src");
var pkgRoot = __dirname;
function getPluginKitReactViteDevAliases() {
  return [
    {
      find: /^@verbb\/plugin-kit-react\/style\.css(\?.*)?$/,
      replacement: `${resolve(pkgRoot, "style.css")}$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/tailwind-theme\.css(\?.*)?$/,
      replacement: `${resolve(pkgRoot, "tailwind-theme.css")}$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/tailwind-preflight-scope\.css(\?.*)?$/,
      replacement: `${resolve(pkgRoot, "tailwind-preflight-scope.css")}$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/components$/,
      replacement: resolve(srcRoot, "components/index.ts")
    },
    {
      find: /^@verbb\/plugin-kit-react\/components\/(.+)$/,
      replacement: `${srcRoot}/components/$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/forms$/,
      replacement: resolve(srcRoot, "forms/index.ts")
    },
    {
      find: /^@verbb\/plugin-kit-react\/forms\/(.+)$/,
      replacement: `${srcRoot}/forms/$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/hooks$/,
      replacement: resolve(srcRoot, "hooks/index.ts")
    },
    {
      find: /^@verbb\/plugin-kit-react\/hooks\/(.+)$/,
      replacement: `${srcRoot}/hooks/$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/fault$/,
      replacement: resolve(srcRoot, "fault/index.ts")
    },
    {
      find: /^@verbb\/plugin-kit-react\/fault\/(.+)$/,
      replacement: `${srcRoot}/fault/$1`
    },
    {
      find: /^@verbb\/plugin-kit-react\/utils$/,
      replacement: resolve(srcRoot, "utils/index.ts")
    },
    {
      find: /^@verbb\/plugin-kit-react\/utils\/(.+)$/,
      replacement: `${srcRoot}/utils/$1`
    },
    {
      find: /^@verbb\/plugin-kit-react$/,
      replacement: resolve(srcRoot, "index.ts")
    }
  ];
}

// .vitepress/config.mts
var __vite_injected_original_import_meta_url2 = "file:///Users/joshcrawford/public_html/plugin-kit-2/plugin-kit-repo/docs/.vitepress/config.mts";
var monorepoRoot = fileURLToPath2(new URL("../..", __vite_injected_original_import_meta_url2));
var pluginKitWebSrc = path.join(monorepoRoot, "plugin-kit-web/src");
var vitepressTheme = fileURLToPath2(new URL("../../../../formie-react/verbb-vitepress-theme/src/index.ts", __vite_injected_original_import_meta_url2));
var formieNodeModules = fileURLToPath2(new URL("../../../../formie-react/formie-plugin-repo/node_modules", __vite_injected_original_import_meta_url2));
var monorepoRequire = createRequire(path.join(monorepoRoot, "package.json"));
var docsRequire = createRequire(path.join(monorepoRoot, "docs/package.json"));
function preferEsmEntry(resolved) {
  if (resolved.endsWith(".cjs")) {
    const mjsCandidate = resolved.replace(/\.cjs$/, ".mjs");
    return existsSync(mjsCandidate) ? mjsCandidate : resolved;
  }
  if (resolved.endsWith(".js") && !resolved.endsWith(".esm.js") && !resolved.endsWith(".es6.js") && !resolved.endsWith(".umd.js") && !resolved.endsWith(".min.js")) {
    const esmCandidate = resolved.replace(/\.js$/, ".esm.js");
    if (existsSync(esmCandidate)) {
      return esmCandidate;
    }
    const es6Candidate = resolved.replace(/\.js$/, ".es6.js");
    if (existsSync(es6Candidate)) {
      return es6Candidate;
    }
    const mjsCandidate = resolved.replace(/\.js$/, ".mjs");
    if (existsSync(mjsCandidate)) {
      return mjsCandidate;
    }
  }
  return resolved;
}
function monorepoNodeModules() {
  const leaveToVite = (source) => {
    return source === "react" || source === "react-dom" || source === "scheduler" || source.startsWith("react/") || source.startsWith("react-dom/");
  };
  return {
    name: "plugin-kit-docs-monorepo-resolve",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!importer || source.startsWith(".") || source.startsWith("\0") || source.startsWith("node:") || path.isAbsolute(source) || leaveToVite(source)) {
        return null;
      }
      try {
        const resolved = await import.meta.resolve(source, pathToFileURL(importer).href);
        return preferEsmEntry(fileURLToPath2(resolved));
      } catch {
      }
      for (const req of [docsRequire, monorepoRequire]) {
        try {
          return preferEsmEntry(req.resolve(source));
        } catch {
        }
      }
      return null;
    }
  };
}
var reactGettingStarted = [
  { text: "Overview", link: "/react/getting-started/overview" },
  { text: "Quick Start", link: "/react/getting-started/quick-start" },
  { text: "CSS Setup", link: "/react/getting-started/css-setup" },
  { text: "Testing and Debugging", link: "/react/getting-started/testing-and-debugging" }
];
var reactAppItems = [
  { text: "Creating a React App", link: "/react/app/creating-a-react-app" }
];
var reactComponentItems = [
  { text: "Button", link: "/react/components/button" },
  { text: "Button Group", link: "/react/components/button-group" },
  { text: "Calendar", link: "/react/components/calendar" },
  { text: "Checkbox", link: "/react/components/checkbox" },
  { text: "Checkbox Input", link: "/react/components/checkbox-input" },
  { text: "Checkbox Select", link: "/react/components/checkbox-select" },
  { text: "Code Editor", link: "/react/components/code-editor" },
  { text: "Color Input", link: "/react/components/color-input" },
  { text: "Combobox", link: "/react/components/combobox" },
  { text: "Copy Button", link: "/react/components/copy-button" },
  { text: "Date Picker", link: "/react/components/date-picker" },
  { text: "Dialog", link: "/react/components/dialog" },
  { text: "Dropdown Menu", link: "/react/components/dropdown-menu" },
  { text: "Editable Table", link: "/react/components/editable-table" },
  { text: "Input", link: "/react/components/input" },
  { text: "Lightswitch", link: "/react/components/lightswitch" },
  { text: "Popover", link: "/react/components/popover" },
  { text: "Radio Group", link: "/react/components/radio-group" },
  { text: "Scroll Area", link: "/react/components/scroll-area" },
  { text: "Select", link: "/react/components/select" },
  { text: "Separator", link: "/react/components/separator" },
  { text: "Spinner", link: "/react/components/spinner" },
  { text: "Status", link: "/react/components/status" },
  { text: "Tabs", link: "/react/components/tabs" },
  { text: "Textarea", link: "/react/components/textarea" },
  { text: "Time Picker", link: "/react/components/time-picker" },
  { text: "Tiptap Editor", link: "/react/components/tiptap-editor" },
  { text: "Tiptap Content", link: "/react/components/tiptap-content" },
  { text: "Tiptap Input", link: "/react/components/tiptap-input" },
  { text: "Toggle", link: "/react/components/toggle" },
  { text: "Toggle Group", link: "/react/components/toggle-group" },
  { text: "Tooltip", link: "/react/components/tooltip" }
];
var webComponentItems = [
  { text: "Button", link: "/web/components/button" },
  { text: "Button Group", link: "/web/components/button-group" },
  { text: "Calendar", link: "/web/components/calendar" },
  { text: "Checkbox", link: "/web/components/checkbox" },
  { text: "Checkbox Input", link: "/web/components/checkbox-input" },
  { text: "Checkbox Select", link: "/web/components/checkbox-select" },
  { text: "Code Editor", link: "/web/components/code-editor" },
  { text: "Color Input", link: "/web/components/color-input" },
  { text: "Combobox", link: "/web/components/combobox" },
  { text: "Copy Button", link: "/web/components/copy-button" },
  { text: "Date Picker", link: "/web/components/date-picker" },
  { text: "Dialog", link: "/web/components/dialog" },
  { text: "Dropdown Menu", link: "/web/components/dropdown-menu" },
  { text: "Editable Table", link: "/web/components/editable-table" },
  { text: "Field", link: "/web/components/field" },
  { text: "Icon", link: "/web/components/icon" },
  { text: "Input", link: "/web/components/input" },
  { text: "Input Group", link: "/web/components/input-group" },
  { text: "Lightswitch", link: "/web/components/lightswitch" },
  { text: "Popover", link: "/web/components/popover" },
  { text: "Radio Group", link: "/web/components/radio-group" },
  { text: "Scroll Area", link: "/web/components/scroll-area" },
  { text: "Select", link: "/web/components/select" },
  { text: "Separator", link: "/web/components/separator" },
  { text: "Spinner", link: "/web/components/spinner" },
  { text: "Status", link: "/web/components/status" },
  { text: "Tabs", link: "/web/components/tabs" },
  { text: "Textarea", link: "/web/components/textarea" },
  { text: "Time Picker", link: "/web/components/time-picker" },
  { text: "Tiptap Editor", link: "/web/components/tiptap-editor" },
  { text: "Tiptap Content", link: "/web/components/tiptap-content" },
  { text: "Tiptap Input", link: "/web/components/tiptap-input" },
  { text: "Toggle", link: "/web/components/toggle" },
  { text: "Toggle Group", link: "/web/components/toggle-group" },
  { text: "Tooltip", link: "/web/components/tooltip" }
];
var reactFormsItems = [
  { text: "Overview", link: "/react/forms/overview" },
  { text: "Schema Structure", link: "/react/forms/schema-structure" },
  { text: "Conditions", link: "/react/forms/conditions" },
  { text: "Schema Components", link: "/react/forms/schema-components" },
  {
    text: "Built-in Schema Components",
    collapsed: true,
    items: [
      { text: "Field Wrap", link: "/react/forms/schema-components/field-wrap" },
      { text: "Modal Tabs", link: "/react/forms/schema-components/modal-tabs" },
      { text: "Modal Tabs List", link: "/react/forms/schema-components/modal-tabs-list" },
      { text: "Modal Tabs Trigger", link: "/react/forms/schema-components/modal-tabs-trigger" },
      { text: "Modal Tabs Content", link: "/react/forms/schema-components/modal-tabs-content" }
    ]
  },
  { text: "Custom Schema Components", link: "/react/forms/custom-schema-components" },
  { text: "Schema Fields", link: "/react/forms/schema-fields" },
  {
    text: "Built-in Schema Fields",
    collapsed: true,
    items: [
      { text: "Calculations Field", link: "/react/forms/schema-fields/calculations-field" },
      { text: "Checkbox Select Field", link: "/react/forms/schema-fields/checkbox-select-field" },
      { text: "Code Editor Field", link: "/react/forms/schema-fields/code-editor-field" },
      { text: "Color Field", link: "/react/forms/schema-fields/color-field" },
      { text: "Combobox Field", link: "/react/forms/schema-fields/combobox-field" },
      { text: "Date Time Field", link: "/react/forms/schema-fields/date-time-field" },
      { text: "Editable Table Field", link: "/react/forms/schema-fields/editable-table-field" },
      { text: "Element Select Field", link: "/react/forms/schema-fields/element-select-field" },
      { text: "Group Field", link: "/react/forms/schema-fields/group-field" },
      { text: "Handle Field", link: "/react/forms/schema-fields/handle-field" },
      { text: "Lightswitch Field", link: "/react/forms/schema-fields/lightswitch-field" },
      { text: "List Field", link: "/react/forms/schema-fields/list-field" },
      { text: "Number Field", link: "/react/forms/schema-fields/number-field" },
      { text: "Radio Group Field", link: "/react/forms/schema-fields/radio-group-field" },
      { text: "Rich Text Field", link: "/react/forms/schema-fields/rich-text-field" },
      { text: "Select Field", link: "/react/forms/schema-fields/select-field" },
      { text: "Static Table Field", link: "/react/forms/schema-fields/static-table-field" },
      { text: "Text Field", link: "/react/forms/schema-fields/text-field" },
      { text: "Textarea Field", link: "/react/forms/schema-fields/textarea-field" },
      { text: "Variable Picker Field", link: "/react/forms/schema-fields/variable-picker-field" }
    ]
  },
  { text: "Custom Schema Fields", link: "/react/forms/custom-schema-fields" }
];
var reactApiItems = [
  { text: "Overview", link: "/react/api/overview" },
  { text: "Public Hooks", link: "/react/api/public-hooks" },
  { text: "Public Utilities", link: "/react/api/public-utilities" },
  { text: "Public Types", link: "/react/api/public-types" },
  { text: "Form APIs", link: "/react/api/form-apis" },
  { text: "SchemaForm API", link: "/react/api/schema-form-api" },
  { text: "SchemaForm Registry", link: "/react/api/schema-form-registry" },
  { text: "React App APIs", link: "/react/api/react-app-apis" },
  { text: "Styling APIs", link: "/react/api/styling-apis" }
];
var reactRecipeItems = [
  { text: "Build a Settings Screen", link: "/react/recipes/build-a-settings-screen" },
  { text: "Compose a Form with Field Primitives", link: "/react/recipes/compose-a-form-with-field-primitives" },
  { text: "Register a Custom SchemaForm Component", link: "/react/recipes/register-a-custom-schemaform-component" },
  { text: "Craft multi-entry plugins", link: "/react/recipes/craft-multi-entry" },
  { text: "v1 compound API migration", link: "/react/recipes/v1-compound-migration" }
];
var config_default = defineConfig({
  title: "Plugin Kit",
  description: "Web components, framework adapters, and Craft CP UI for Verbb plugins.",
  base: "/plugin-kit/",
  cleanUrls: true,
  appearance: false,
  lastUpdated: true,
  vite: {
    optimizeDeps: {
      exclude: [
        "@verbb/plugin-kit-react",
        "@verbb/plugin-kit-web",
        "@verbb/plugin-kit-icons"
      ],
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@fortawesome/react-fontawesome",
        "lodash-es",
        "punycode.js",
        "@codemirror/autocomplete",
        "@codemirror/commands",
        "@codemirror/lang-css",
        "@codemirror/lang-html",
        "@codemirror/lang-javascript",
        "@codemirror/lang-json",
        "@codemirror/language",
        "@codemirror/state",
        "@codemirror/view"
      ]
    },
    server: {
      port: 5281,
      strictPort: true,
      fs: {
        allow: [
          monorepoRoot,
          path.resolve(monorepoRoot, ".."),
          path.dirname(vitepressTheme),
          formieNodeModules
        ]
      }
    },
    preview: {
      port: 4281,
      strictPort: true
    },
    ssr: {
      noExternal: ["@babel/runtime", "@babel/runtime/helpers/interopRequireDefault", "@verbb/vitepress-theme"]
    },
    resolve: {
      // VitePress still ships Vite 5 — map TS `*.js` import specifiers to source files.
      extensionAlias: {
        ".js": [".ts", ".tsx", ".js", ".jsx"]
      },
      alias: [
        {
          // markdown-it imports `punycode.js`; package "main" is CJS without default export.
          find: "punycode.js",
          replacement: path.join(monorepoRoot, "node_modules/punycode.js/punycode.es6.js")
        },
        {
          find: "lodash-es",
          replacement: path.join(monorepoRoot, "node_modules/lodash-es")
        },
        {
          find: "mark.js/src/vanilla.js",
          replacement: path.join(monorepoRoot, "node_modules/mark.js/dist/mark.es6.js")
        },
        {
          find: "@verbb/vitepress-theme",
          replacement: vitepressTheme
        },
        {
          find: "@fortawesome/fontawesome-svg-core",
          replacement: path.join(formieNodeModules, "@fortawesome/fontawesome-svg-core")
        },
        {
          find: "@fortawesome/pro-regular-svg-icons",
          replacement: path.join(formieNodeModules, "@fortawesome/pro-regular-svg-icons")
        },
        {
          find: "@fortawesome/pro-solid-svg-icons",
          replacement: path.join(formieNodeModules, "@fortawesome/pro-solid-svg-icons")
        },
        {
          find: "@fortawesome/react-fontawesome",
          replacement: path.join(formieNodeModules, "@fortawesome/react-fontawesome")
        },
        {
          find: "@verbb/plugin-kit",
          replacement: fileURLToPath2(new URL("../../plugin-kit-core/src/index.ts", __vite_injected_original_import_meta_url2))
        },
        {
          find: "@verbb/plugin-kit-codemirror-core",
          replacement: fileURLToPath2(new URL("../../plugin-kit-codemirror-core/src/index.ts", __vite_injected_original_import_meta_url2))
        },
        {
          find: "@verbb/plugin-kit-icons/all.js",
          replacement: fileURLToPath2(new URL("../../plugin-kit-icons/src/all.ts", __vite_injected_original_import_meta_url2))
        },
        {
          find: "@verbb/plugin-kit-icons",
          replacement: fileURLToPath2(new URL("../../plugin-kit-icons/src/index.ts", __vite_injected_original_import_meta_url2))
        },
        {
          find: "@verbb/plugin-kit-tiptap-core",
          replacement: fileURLToPath2(new URL("../../plugin-kit-tiptap-core/src/index.ts", __vite_injected_original_import_meta_url2))
        },
        {
          // Preserve Vite query suffixes (`?inline`) when rewriting CSS/subpath imports.
          find: /^@verbb\/plugin-kit-web\/tokens\.css(\?.*)?$/,
          replacement: `${fileURLToPath2(new URL("../../plugin-kit-web/src/tokens/tokens.css", __vite_injected_original_import_meta_url2))}$1`
        },
        {
          find: /^@verbb\/plugin-kit-web\/styles\/utilities\/fouce\.css(\?.*)?$/,
          replacement: `${fileURLToPath2(new URL("../../plugin-kit-web/src/styles/utilities/fouce.css", __vite_injected_original_import_meta_url2))}$1`
        },
        {
          find: /^@verbb\/plugin-kit-web\/styles\/overlay-content\.css(\?.*)?$/,
          replacement: `${fileURLToPath2(new URL("../../plugin-kit-web/src/styles/overlay-content.css", __vite_injected_original_import_meta_url2))}$1`
        },
        {
          // TipTap split families (not */index.ts).
          find: /^@verbb\/plugin-kit-web\/components\/tiptap-(content|editor|input)\.js$/,
          replacement: `${pluginKitWebSrc}/components/tiptap/pk-tiptap-$1.ts`
        },
        {
          // Short family barrels: components/button.js → components/button/index.ts
          find: /^@verbb\/plugin-kit-web\/components\/([^/]+)\.js$/,
          replacement: `${pluginKitWebSrc}/components/$1/index.ts`
        },
        {
          // Component / deep imports before the package root alias (`$1` = path under src/).
          find: /^@verbb\/plugin-kit-web\/(.*)$/,
          replacement: `${pluginKitWebSrc}/$1`
        },
        {
          find: "@verbb/plugin-kit-web",
          replacement: fileURLToPath2(new URL("../../plugin-kit-web/src/index.ts", __vite_injected_original_import_meta_url2))
        },
        // Canonical React adapters (not ss/plugin-kit-react).
        ...getPluginKitReactViteDevAliases()
      ],
      dedupe: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime"
      ]
    },
    plugins: [monorepoNodeModules(), tailwindcss()]
  },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/plugin-kit/favicon.svg" }]
  ],
  themeConfig: {
    logo: "/plugin-kit-react-logo.svg",
    siteTitle: "Plugin Kit",
    docsTheme: {
      homeLink: "/plugin-kit/",
      primary: "#e64d4c"
    },
    nav: [
      { text: "Overview", link: "/overview/" },
      { text: "Web", link: "/web/" },
      { text: "React", link: "/react/getting-started/overview" },
      { text: "Vue", link: "/vue/" },
      { text: "Forms", link: "/forms/" },
      { text: "Tiptap", link: "/tiptap/" }
    ],
    sidebar: {
      "/overview/": [
        {
          text: "Plugin Kit",
          items: [
            { text: "Overview", link: "/overview/" }
          ]
        }
      ],
      "/web/": [
        {
          text: "Getting Started",
          items: [
            { text: "Overview", link: "/web/" },
            { text: "Quick Start", link: "/web/getting-started/quick-start" },
            { text: "No-Build Step", link: "/web/getting-started/no-build-step" },
            { text: "Tokens & CSS", link: "/web/getting-started/tokens" },
            { text: "Reducing FOUCE", link: "/web/getting-started/fouce" }
          ]
        },
        {
          text: "Components",
          items: webComponentItems
        }
      ],
      "/vue/": [
        {
          text: "Getting Started",
          items: [
            { text: "Overview", link: "/vue/" },
            { text: "Quick Start", link: "/vue/getting-started/quick-start" }
          ]
        },
        {
          text: "App",
          items: [
            { text: "Creating a Vue App", link: "/vue/app/creating-a-vue-app" }
          ]
        }
      ],
      "/forms/": [
        {
          text: "Forms",
          items: [
            { text: "Overview", link: "/forms/" }
          ]
        }
      ],
      "/tiptap/": [
        {
          text: "Tiptap",
          items: [
            { text: "Overview", link: "/tiptap/" },
            { text: "JavaScript (`@verbb/plugin-kit-tiptap-core`)", link: "/tiptap/javascript" },
            { text: "PHP (`verbb/tiptap`)", link: "/tiptap/php" }
          ]
        }
      ],
      "/react/": [
        { text: "Getting Started", items: reactGettingStarted },
        { text: "React App", items: reactAppItems },
        { text: "Components", items: reactComponentItems },
        { text: "SchemaForm", items: reactFormsItems },
        { text: "API Reference", items: reactApiItems },
        { text: "Recipes", items: reactRecipeItems }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/verbb/plugin-kit" }],
    editLink: {
      pattern: "https://github.com/verbb/plugin-kit/edit/main/docs/:path",
      text: "Edit this page"
    },
    outline: [2, 3],
    lastUpdatedText: "Last updated",
    search: {
      provider: "local"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi4uL3BsdWdpbi1raXQtcmVhY3Qvdml0ZS1kZXYubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pvc2hjcmF3Zm9yZC9wdWJsaWNfaHRtbC9wbHVnaW4ta2l0LTIvcGx1Z2luLWtpdC1yZXBvL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pvc2hjcmF3Zm9yZC9wdWJsaWNfaHRtbC9wbHVnaW4ta2l0LTIvcGx1Z2luLWtpdC1yZXBvL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qb3NoY3Jhd2ZvcmQvcHVibGljX2h0bWwvcGx1Z2luLWtpdC0yL3BsdWdpbi1raXQtcmVwby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIHBhdGhUb0ZpbGVVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ25vZGU6bW9kdWxlJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCB7IGdldFBsdWdpbktpdFJlYWN0Vml0ZURldkFsaWFzZXMgfSBmcm9tICcuLi8uLi9wbHVnaW4ta2l0LXJlYWN0L3ZpdGUtZGV2Lm1qcyc7XG5cbmNvbnN0IG1vbm9yZXBvUm9vdCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4nLCBpbXBvcnQubWV0YS51cmwpKTtcbmNvbnN0IHBsdWdpbktpdFdlYlNyYyA9IHBhdGguam9pbihtb25vcmVwb1Jvb3QsICdwbHVnaW4ta2l0LXdlYi9zcmMnKTtcbmNvbnN0IHZpdGVwcmVzc1RoZW1lID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8uLi8uLi8uLi9mb3JtaWUtcmVhY3QvdmVyYmItdml0ZXByZXNzLXRoZW1lL3NyYy9pbmRleC50cycsIGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3QgZm9ybWllTm9kZU1vZHVsZXMgPSBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uLy4uLy4uLy4uL2Zvcm1pZS1yZWFjdC9mb3JtaWUtcGx1Z2luLXJlcG8vbm9kZV9tb2R1bGVzJywgaW1wb3J0Lm1ldGEudXJsKSk7XG5cbmNvbnN0IG1vbm9yZXBvUmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUocGF0aC5qb2luKG1vbm9yZXBvUm9vdCwgJ3BhY2thZ2UuanNvbicpKTtcbmNvbnN0IGRvY3NSZXF1aXJlID0gY3JlYXRlUmVxdWlyZShwYXRoLmpvaW4obW9ub3JlcG9Sb290LCAnZG9jcy9wYWNrYWdlLmpzb24nKSk7XG5cbmZ1bmN0aW9uIHByZWZlckVzbUVudHJ5KHJlc29sdmVkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChyZXNvbHZlZC5lbmRzV2l0aCgnLmNqcycpKSB7XG4gICAgICAgIGNvbnN0IG1qc0NhbmRpZGF0ZSA9IHJlc29sdmVkLnJlcGxhY2UoL1xcLmNqcyQvLCAnLm1qcycpO1xuXG4gICAgICAgIHJldHVybiBleGlzdHNTeW5jKG1qc0NhbmRpZGF0ZSkgPyBtanNDYW5kaWRhdGUgOiByZXNvbHZlZDtcbiAgICB9XG5cbiAgICAvLyBEdWFsIENKUy9FU00gcGFja2FnZXMgZXhwb3NlIGBtYWluYCBhcyAqLmpzIGFuZCBgbW9kdWxlYCBhcyBhIHNlcGFyYXRlIEVTTSBmaWxlLlxuICAgIC8vIE5vZGUgcmVzb2x1dGlvbiByZXR1cm5zIHRoZSBDSlMgZmlsZSwgd2hpY2ggYnJlYWtzIEVTTSBpbXBvcnRzIChuYW1lZCBvciBkZWZhdWx0KS5cbiAgICAvLyBlLmcuIHB1bnljb2RlLmpzIFx1MjE5MiBwdW55Y29kZS5lczYuanMgKG1hcmtkb3duLWl0IC8gcGstZmllbGQgaW5saW5lIG1hcmtkb3duKS5cbiAgICBpZiAoXG4gICAgICAgIHJlc29sdmVkLmVuZHNXaXRoKCcuanMnKVxuICAgICAgICAmJiAhcmVzb2x2ZWQuZW5kc1dpdGgoJy5lc20uanMnKVxuICAgICAgICAmJiAhcmVzb2x2ZWQuZW5kc1dpdGgoJy5lczYuanMnKVxuICAgICAgICAmJiAhcmVzb2x2ZWQuZW5kc1dpdGgoJy51bWQuanMnKVxuICAgICAgICAmJiAhcmVzb2x2ZWQuZW5kc1dpdGgoJy5taW4uanMnKVxuICAgICkge1xuICAgICAgICBjb25zdCBlc21DYW5kaWRhdGUgPSByZXNvbHZlZC5yZXBsYWNlKC9cXC5qcyQvLCAnLmVzbS5qcycpO1xuXG4gICAgICAgIGlmIChleGlzdHNTeW5jKGVzbUNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBlc21DYW5kaWRhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlczZDYW5kaWRhdGUgPSByZXNvbHZlZC5yZXBsYWNlKC9cXC5qcyQvLCAnLmVzNi5qcycpO1xuXG4gICAgICAgIGlmIChleGlzdHNTeW5jKGVzNkNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBlczZDYW5kaWRhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtanNDYW5kaWRhdGUgPSByZXNvbHZlZC5yZXBsYWNlKC9cXC5qcyQvLCAnLm1qcycpO1xuXG4gICAgICAgIGlmIChleGlzdHNTeW5jKG1qc0NhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBtanNDYW5kaWRhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x2ZWQ7XG59XG5cbmZ1bmN0aW9uIG1vbm9yZXBvTm9kZU1vZHVsZXMoKTogUGx1Z2luIHtcbiAgICAvLyBMZWF2ZSBSZWFjdCAoYW5kIGpzeCBydW50aW1lcykgdG8gVml0ZSBvcHRpbWl6ZURlcHMgXHUyMDE0IGZvcmNpbmcgcmF3XG4gICAgLy8gYG5vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qc2AgYnJlYWtzIGBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnYCBpbiBFU00uXG4gICAgY29uc3QgbGVhdmVUb1ZpdGUgPSAoc291cmNlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gJ3JlYWN0J1xuICAgICAgICAgICAgfHwgc291cmNlID09PSAncmVhY3QtZG9tJ1xuICAgICAgICAgICAgfHwgc291cmNlID09PSAnc2NoZWR1bGVyJ1xuICAgICAgICAgICAgfHwgc291cmNlLnN0YXJ0c1dpdGgoJ3JlYWN0LycpXG4gICAgICAgICAgICB8fCBzb3VyY2Uuc3RhcnRzV2l0aCgncmVhY3QtZG9tLycpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAncGx1Z2luLWtpdC1kb2NzLW1vbm9yZXBvLXJlc29sdmUnLFxuICAgICAgICBlbmZvcmNlOiAncHJlJyxcbiAgICAgICAgYXN5bmMgcmVzb2x2ZUlkKHNvdXJjZSwgaW1wb3J0ZXIpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhaW1wb3J0ZXJcbiAgICAgICAgICAgICAgICB8fCBzb3VyY2Uuc3RhcnRzV2l0aCgnLicpXG4gICAgICAgICAgICAgICAgfHwgc291cmNlLnN0YXJ0c1dpdGgoJ1xcMCcpXG4gICAgICAgICAgICAgICAgfHwgc291cmNlLnN0YXJ0c1dpdGgoJ25vZGU6JylcbiAgICAgICAgICAgICAgICB8fCBwYXRoLmlzQWJzb2x1dGUoc291cmNlKVxuICAgICAgICAgICAgICAgIHx8IGxlYXZlVG9WaXRlKHNvdXJjZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXNwZWN0IHBhY2thZ2UgXCJpbXBvcnRcIiBjb25kaXRpb25zIHNvIGR1YWwgQ0pTL0VTTSBkZXBzIChlLmcuIEB2dWV1c2UvY29yZSlcbiAgICAgICAgICAgIC8vIGV4cG9zZSBuYW1lZCBleHBvcnRzIHRvIFZpdGVQcmVzcyBpbnN0ZWFkIG9mIHJlc29sdmluZyB0byBpbmRleC5janMuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgaW1wb3J0Lm1ldGEucmVzb2x2ZShzb3VyY2UsIHBhdGhUb0ZpbGVVUkwoaW1wb3J0ZXIpLmhyZWYpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWZlckVzbUVudHJ5KGZpbGVVUkxUb1BhdGgocmVzb2x2ZWQpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8vIEZhbGwgYmFjayB0byBOb2RlIHJlc29sdXRpb24gZm9yIHBhY2thZ2VzIG91dHNpZGUgaW1wb3J0Lm1ldGEucmVzb2x2ZS5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXEgb2YgW2RvY3NSZXF1aXJlLCBtb25vcmVwb1JlcXVpcmVdKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZWZlckVzbUVudHJ5KHJlcS5yZXNvbHZlKHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAvLyB0cnkgbmV4dCByZXNvbHZlciByb290XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5jb25zdCByZWFjdEdldHRpbmdTdGFydGVkID0gW1xuICAgIHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvb3ZlcnZpZXcnIH0sXG4gICAgeyB0ZXh0OiAnUXVpY2sgU3RhcnQnLCBsaW5rOiAnL3JlYWN0L2dldHRpbmctc3RhcnRlZC9xdWljay1zdGFydCcgfSxcbiAgICB7IHRleHQ6ICdDU1MgU2V0dXAnLCBsaW5rOiAnL3JlYWN0L2dldHRpbmctc3RhcnRlZC9jc3Mtc2V0dXAnIH0sXG4gICAgeyB0ZXh0OiAnVGVzdGluZyBhbmQgRGVidWdnaW5nJywgbGluazogJy9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvdGVzdGluZy1hbmQtZGVidWdnaW5nJyB9LFxuXTtcblxuY29uc3QgcmVhY3RBcHBJdGVtcyA9IFtcbiAgICB7IHRleHQ6ICdDcmVhdGluZyBhIFJlYWN0IEFwcCcsIGxpbms6ICcvcmVhY3QvYXBwL2NyZWF0aW5nLWEtcmVhY3QtYXBwJyB9LFxuXTtcblxuY29uc3QgcmVhY3RDb21wb25lbnRJdGVtcyA9IFtcbiAgICB7IHRleHQ6ICdCdXR0b24nLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvYnV0dG9uJyB9LFxuICAgIHsgdGV4dDogJ0J1dHRvbiBHcm91cCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9idXR0b24tZ3JvdXAnIH0sXG4gICAgeyB0ZXh0OiAnQ2FsZW5kYXInLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvY2FsZW5kYXInIH0sXG4gICAgeyB0ZXh0OiAnQ2hlY2tib3gnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvY2hlY2tib3gnIH0sXG4gICAgeyB0ZXh0OiAnQ2hlY2tib3ggSW5wdXQnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvY2hlY2tib3gtaW5wdXQnIH0sXG4gICAgeyB0ZXh0OiAnQ2hlY2tib3ggU2VsZWN0JywgbGluazogJy9yZWFjdC9jb21wb25lbnRzL2NoZWNrYm94LXNlbGVjdCcgfSxcbiAgICB7IHRleHQ6ICdDb2RlIEVkaXRvcicsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9jb2RlLWVkaXRvcicgfSxcbiAgICB7IHRleHQ6ICdDb2xvciBJbnB1dCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9jb2xvci1pbnB1dCcgfSxcbiAgICB7IHRleHQ6ICdDb21ib2JveCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9jb21ib2JveCcgfSxcbiAgICB7IHRleHQ6ICdDb3B5IEJ1dHRvbicsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9jb3B5LWJ1dHRvbicgfSxcbiAgICB7IHRleHQ6ICdEYXRlIFBpY2tlcicsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9kYXRlLXBpY2tlcicgfSxcbiAgICB7IHRleHQ6ICdEaWFsb2cnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvZGlhbG9nJyB9LFxuICAgIHsgdGV4dDogJ0Ryb3Bkb3duIE1lbnUnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvZHJvcGRvd24tbWVudScgfSxcbiAgICB7IHRleHQ6ICdFZGl0YWJsZSBUYWJsZScsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9lZGl0YWJsZS10YWJsZScgfSxcbiAgICB7IHRleHQ6ICdJbnB1dCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9pbnB1dCcgfSxcbiAgICB7IHRleHQ6ICdMaWdodHN3aXRjaCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy9saWdodHN3aXRjaCcgfSxcbiAgICB7IHRleHQ6ICdQb3BvdmVyJywgbGluazogJy9yZWFjdC9jb21wb25lbnRzL3BvcG92ZXInIH0sXG4gICAgeyB0ZXh0OiAnUmFkaW8gR3JvdXAnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAnIH0sXG4gICAgeyB0ZXh0OiAnU2Nyb2xsIEFyZWEnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvc2Nyb2xsLWFyZWEnIH0sXG4gICAgeyB0ZXh0OiAnU2VsZWN0JywgbGluazogJy9yZWFjdC9jb21wb25lbnRzL3NlbGVjdCcgfSxcbiAgICB7IHRleHQ6ICdTZXBhcmF0b3InLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvc2VwYXJhdG9yJyB9LFxuICAgIHsgdGV4dDogJ1NwaW5uZXInLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvc3Bpbm5lcicgfSxcbiAgICB7IHRleHQ6ICdTdGF0dXMnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvc3RhdHVzJyB9LFxuICAgIHsgdGV4dDogJ1RhYnMnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvdGFicycgfSxcbiAgICB7IHRleHQ6ICdUZXh0YXJlYScsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy90ZXh0YXJlYScgfSxcbiAgICB7IHRleHQ6ICdUaW1lIFBpY2tlcicsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy90aW1lLXBpY2tlcicgfSxcbiAgICB7IHRleHQ6ICdUaXB0YXAgRWRpdG9yJywgbGluazogJy9yZWFjdC9jb21wb25lbnRzL3RpcHRhcC1lZGl0b3InIH0sXG4gICAgeyB0ZXh0OiAnVGlwdGFwIENvbnRlbnQnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvdGlwdGFwLWNvbnRlbnQnIH0sXG4gICAgeyB0ZXh0OiAnVGlwdGFwIElucHV0JywgbGluazogJy9yZWFjdC9jb21wb25lbnRzL3RpcHRhcC1pbnB1dCcgfSxcbiAgICB7IHRleHQ6ICdUb2dnbGUnLCBsaW5rOiAnL3JlYWN0L2NvbXBvbmVudHMvdG9nZ2xlJyB9LFxuICAgIHsgdGV4dDogJ1RvZ2dsZSBHcm91cCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy90b2dnbGUtZ3JvdXAnIH0sXG4gICAgeyB0ZXh0OiAnVG9vbHRpcCcsIGxpbms6ICcvcmVhY3QvY29tcG9uZW50cy90b29sdGlwJyB9LFxuXTtcblxuLyoqIFdlYiBuYXYgaXMgY2Fub25pY2FsIFx1MjAxNCBpbmNsdWRlcyBwcmltaXRpdmVzIHRoYXQgZG8gbm90IGhhdmUgUmVhY3QgZG9jIHBhZ2VzIHlldC4gKi9cbmNvbnN0IHdlYkNvbXBvbmVudEl0ZW1zID0gW1xuICAgIHsgdGV4dDogJ0J1dHRvbicsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvYnV0dG9uJyB9LFxuICAgIHsgdGV4dDogJ0J1dHRvbiBHcm91cCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvYnV0dG9uLWdyb3VwJyB9LFxuICAgIHsgdGV4dDogJ0NhbGVuZGFyJywgbGluazogJy93ZWIvY29tcG9uZW50cy9jYWxlbmRhcicgfSxcbiAgICB7IHRleHQ6ICdDaGVja2JveCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvY2hlY2tib3gnIH0sXG4gICAgeyB0ZXh0OiAnQ2hlY2tib3ggSW5wdXQnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL2NoZWNrYm94LWlucHV0JyB9LFxuICAgIHsgdGV4dDogJ0NoZWNrYm94IFNlbGVjdCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvY2hlY2tib3gtc2VsZWN0JyB9LFxuICAgIHsgdGV4dDogJ0NvZGUgRWRpdG9yJywgbGluazogJy93ZWIvY29tcG9uZW50cy9jb2RlLWVkaXRvcicgfSxcbiAgICB7IHRleHQ6ICdDb2xvciBJbnB1dCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvY29sb3ItaW5wdXQnIH0sXG4gICAgeyB0ZXh0OiAnQ29tYm9ib3gnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL2NvbWJvYm94JyB9LFxuICAgIHsgdGV4dDogJ0NvcHkgQnV0dG9uJywgbGluazogJy93ZWIvY29tcG9uZW50cy9jb3B5LWJ1dHRvbicgfSxcbiAgICB7IHRleHQ6ICdEYXRlIFBpY2tlcicsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvZGF0ZS1waWNrZXInIH0sXG4gICAgeyB0ZXh0OiAnRGlhbG9nJywgbGluazogJy93ZWIvY29tcG9uZW50cy9kaWFsb2cnIH0sXG4gICAgeyB0ZXh0OiAnRHJvcGRvd24gTWVudScsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudScgfSxcbiAgICB7IHRleHQ6ICdFZGl0YWJsZSBUYWJsZScsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvZWRpdGFibGUtdGFibGUnIH0sXG4gICAgeyB0ZXh0OiAnRmllbGQnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL2ZpZWxkJyB9LFxuICAgIHsgdGV4dDogJ0ljb24nLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL2ljb24nIH0sXG4gICAgeyB0ZXh0OiAnSW5wdXQnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL2lucHV0JyB9LFxuICAgIHsgdGV4dDogJ0lucHV0IEdyb3VwJywgbGluazogJy93ZWIvY29tcG9uZW50cy9pbnB1dC1ncm91cCcgfSxcbiAgICB7IHRleHQ6ICdMaWdodHN3aXRjaCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvbGlnaHRzd2l0Y2gnIH0sXG4gICAgeyB0ZXh0OiAnUG9wb3ZlcicsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvcG9wb3ZlcicgfSxcbiAgICB7IHRleHQ6ICdSYWRpbyBHcm91cCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAnIH0sXG4gICAgeyB0ZXh0OiAnU2Nyb2xsIEFyZWEnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3Njcm9sbC1hcmVhJyB9LFxuICAgIHsgdGV4dDogJ1NlbGVjdCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvc2VsZWN0JyB9LFxuICAgIHsgdGV4dDogJ1NlcGFyYXRvcicsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvc2VwYXJhdG9yJyB9LFxuICAgIHsgdGV4dDogJ1NwaW5uZXInLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3NwaW5uZXInIH0sXG4gICAgeyB0ZXh0OiAnU3RhdHVzJywgbGluazogJy93ZWIvY29tcG9uZW50cy9zdGF0dXMnIH0sXG4gICAgeyB0ZXh0OiAnVGFicycsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvdGFicycgfSxcbiAgICB7IHRleHQ6ICdUZXh0YXJlYScsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvdGV4dGFyZWEnIH0sXG4gICAgeyB0ZXh0OiAnVGltZSBQaWNrZXInLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3RpbWUtcGlja2VyJyB9LFxuICAgIHsgdGV4dDogJ1RpcHRhcCBFZGl0b3InLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3RpcHRhcC1lZGl0b3InIH0sXG4gICAgeyB0ZXh0OiAnVGlwdGFwIENvbnRlbnQnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3RpcHRhcC1jb250ZW50JyB9LFxuICAgIHsgdGV4dDogJ1RpcHRhcCBJbnB1dCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvdGlwdGFwLWlucHV0JyB9LFxuICAgIHsgdGV4dDogJ1RvZ2dsZScsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvdG9nZ2xlJyB9LFxuICAgIHsgdGV4dDogJ1RvZ2dsZSBHcm91cCcsIGxpbms6ICcvd2ViL2NvbXBvbmVudHMvdG9nZ2xlLWdyb3VwJyB9LFxuICAgIHsgdGV4dDogJ1Rvb2x0aXAnLCBsaW5rOiAnL3dlYi9jb21wb25lbnRzL3Rvb2x0aXAnIH0sXG5dO1xuXG5jb25zdCByZWFjdEZvcm1zSXRlbXMgPSBbXG4gICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL292ZXJ2aWV3JyB9LFxuICAgIHsgdGV4dDogJ1NjaGVtYSBTdHJ1Y3R1cmUnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1zdHJ1Y3R1cmUnIH0sXG4gICAgeyB0ZXh0OiAnQ29uZGl0aW9ucycsIGxpbms6ICcvcmVhY3QvZm9ybXMvY29uZGl0aW9ucycgfSxcbiAgICB7IHRleHQ6ICdTY2hlbWEgQ29tcG9uZW50cycsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWNvbXBvbmVudHMnIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnQnVpbHQtaW4gU2NoZW1hIENvbXBvbmVudHMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdGaWVsZCBXcmFwJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtY29tcG9uZW50cy9maWVsZC13cmFwJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTW9kYWwgVGFicycsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWNvbXBvbmVudHMvbW9kYWwtdGFicycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ01vZGFsIFRhYnMgTGlzdCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWNvbXBvbmVudHMvbW9kYWwtdGFicy1saXN0JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTW9kYWwgVGFicyBUcmlnZ2VyJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtY29tcG9uZW50cy9tb2RhbC10YWJzLXRyaWdnZXInIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdNb2RhbCBUYWJzIENvbnRlbnQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1jb21wb25lbnRzL21vZGFsLXRhYnMtY29udGVudCcgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHsgdGV4dDogJ0N1c3RvbSBTY2hlbWEgQ29tcG9uZW50cycsIGxpbms6ICcvcmVhY3QvZm9ybXMvY3VzdG9tLXNjaGVtYS1jb21wb25lbnRzJyB9LFxuICAgIHsgdGV4dDogJ1NjaGVtYSBGaWVsZHMnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMnIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnQnVpbHQtaW4gU2NoZW1hIEZpZWxkcycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0NhbGN1bGF0aW9ucyBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9jYWxjdWxhdGlvbnMtZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdDaGVja2JveCBTZWxlY3QgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvY2hlY2tib3gtc2VsZWN0LWZpZWxkJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQ29kZSBFZGl0b3IgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvY29kZS1lZGl0b3ItZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdDb2xvciBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9jb2xvci1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0NvbWJvYm94IEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL2NvbWJvYm94LWZpZWxkJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRGF0ZSBUaW1lIEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL2RhdGUtdGltZS1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0VkaXRhYmxlIFRhYmxlIEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL2VkaXRhYmxlLXRhYmxlLWZpZWxkJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRWxlbWVudCBTZWxlY3QgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvZWxlbWVudC1zZWxlY3QtZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdHcm91cCBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9ncm91cC1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0hhbmRsZSBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9oYW5kbGUtZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdMaWdodHN3aXRjaCBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9saWdodHN3aXRjaC1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0xpc3QgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvbGlzdC1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ051bWJlciBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9udW1iZXItZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdSYWRpbyBHcm91cCBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9yYWRpby1ncm91cC1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1JpY2ggVGV4dCBGaWVsZCcsIGxpbms6ICcvcmVhY3QvZm9ybXMvc2NoZW1hLWZpZWxkcy9yaWNoLXRleHQtZmllbGQnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTZWxlY3QgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvc2VsZWN0LWZpZWxkJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnU3RhdGljIFRhYmxlIEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL3N0YXRpYy10YWJsZS1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1RleHQgRmllbGQnLCBsaW5rOiAnL3JlYWN0L2Zvcm1zL3NjaGVtYS1maWVsZHMvdGV4dC1maWVsZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1RleHRhcmVhIEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL3RleHRhcmVhLWZpZWxkJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnVmFyaWFibGUgUGlja2VyIEZpZWxkJywgbGluazogJy9yZWFjdC9mb3Jtcy9zY2hlbWEtZmllbGRzL3ZhcmlhYmxlLXBpY2tlci1maWVsZCcgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHsgdGV4dDogJ0N1c3RvbSBTY2hlbWEgRmllbGRzJywgbGluazogJy9yZWFjdC9mb3Jtcy9jdXN0b20tc2NoZW1hLWZpZWxkcycgfSxcbl07XG5cbmNvbnN0IHJlYWN0QXBpSXRlbXMgPSBbXG4gICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL3JlYWN0L2FwaS9vdmVydmlldycgfSxcbiAgICB7IHRleHQ6ICdQdWJsaWMgSG9va3MnLCBsaW5rOiAnL3JlYWN0L2FwaS9wdWJsaWMtaG9va3MnIH0sXG4gICAgeyB0ZXh0OiAnUHVibGljIFV0aWxpdGllcycsIGxpbms6ICcvcmVhY3QvYXBpL3B1YmxpYy11dGlsaXRpZXMnIH0sXG4gICAgeyB0ZXh0OiAnUHVibGljIFR5cGVzJywgbGluazogJy9yZWFjdC9hcGkvcHVibGljLXR5cGVzJyB9LFxuICAgIHsgdGV4dDogJ0Zvcm0gQVBJcycsIGxpbms6ICcvcmVhY3QvYXBpL2Zvcm0tYXBpcycgfSxcbiAgICB7IHRleHQ6ICdTY2hlbWFGb3JtIEFQSScsIGxpbms6ICcvcmVhY3QvYXBpL3NjaGVtYS1mb3JtLWFwaScgfSxcbiAgICB7IHRleHQ6ICdTY2hlbWFGb3JtIFJlZ2lzdHJ5JywgbGluazogJy9yZWFjdC9hcGkvc2NoZW1hLWZvcm0tcmVnaXN0cnknIH0sXG4gICAgeyB0ZXh0OiAnUmVhY3QgQXBwIEFQSXMnLCBsaW5rOiAnL3JlYWN0L2FwaS9yZWFjdC1hcHAtYXBpcycgfSxcbiAgICB7IHRleHQ6ICdTdHlsaW5nIEFQSXMnLCBsaW5rOiAnL3JlYWN0L2FwaS9zdHlsaW5nLWFwaXMnIH0sXG5dO1xuXG5jb25zdCByZWFjdFJlY2lwZUl0ZW1zID0gW1xuICAgIHsgdGV4dDogJ0J1aWxkIGEgU2V0dGluZ3MgU2NyZWVuJywgbGluazogJy9yZWFjdC9yZWNpcGVzL2J1aWxkLWEtc2V0dGluZ3Mtc2NyZWVuJyB9LFxuICAgIHsgdGV4dDogJ0NvbXBvc2UgYSBGb3JtIHdpdGggRmllbGQgUHJpbWl0aXZlcycsIGxpbms6ICcvcmVhY3QvcmVjaXBlcy9jb21wb3NlLWEtZm9ybS13aXRoLWZpZWxkLXByaW1pdGl2ZXMnIH0sXG4gICAgeyB0ZXh0OiAnUmVnaXN0ZXIgYSBDdXN0b20gU2NoZW1hRm9ybSBDb21wb25lbnQnLCBsaW5rOiAnL3JlYWN0L3JlY2lwZXMvcmVnaXN0ZXItYS1jdXN0b20tc2NoZW1hZm9ybS1jb21wb25lbnQnIH0sXG4gICAgeyB0ZXh0OiAnQ3JhZnQgbXVsdGktZW50cnkgcGx1Z2lucycsIGxpbms6ICcvcmVhY3QvcmVjaXBlcy9jcmFmdC1tdWx0aS1lbnRyeScgfSxcbiAgICB7IHRleHQ6ICd2MSBjb21wb3VuZCBBUEkgbWlncmF0aW9uJywgbGluazogJy9yZWFjdC9yZWNpcGVzL3YxLWNvbXBvdW5kLW1pZ3JhdGlvbicgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgdGl0bGU6ICdQbHVnaW4gS2l0JyxcbiAgICBkZXNjcmlwdGlvbjogJ1dlYiBjb21wb25lbnRzLCBmcmFtZXdvcmsgYWRhcHRlcnMsIGFuZCBDcmFmdCBDUCBVSSBmb3IgVmVyYmIgcGx1Z2lucy4nLFxuICAgIGJhc2U6ICcvcGx1Z2luLWtpdC8nLFxuICAgIGNsZWFuVXJsczogdHJ1ZSxcbiAgICBhcHBlYXJhbmNlOiBmYWxzZSxcbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSxcbiAgICB2aXRlOiB7XG4gICAgICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgICAgICdAdmVyYmIvcGx1Z2luLWtpdC1yZWFjdCcsXG4gICAgICAgICAgICAgICAgJ0B2ZXJiYi9wbHVnaW4ta2l0LXdlYicsXG4gICAgICAgICAgICAgICAgJ0B2ZXJiYi9wbHVnaW4ta2l0LWljb25zJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgICAgICAgICAncmVhY3QtZG9tJyxcbiAgICAgICAgICAgICAgICAncmVhY3QtZG9tL2NsaWVudCcsXG4gICAgICAgICAgICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICAgICAgICAgICAgICAncmVhY3QvanN4LWRldi1ydW50aW1lJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJyxcbiAgICAgICAgICAgICAgICAnbG9kYXNoLWVzJyxcbiAgICAgICAgICAgICAgICAncHVueWNvZGUuanMnLFxuICAgICAgICAgICAgICAgICdAY29kZW1pcnJvci9hdXRvY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICdAY29kZW1pcnJvci9jb21tYW5kcycsXG4gICAgICAgICAgICAgICAgJ0Bjb2RlbWlycm9yL2xhbmctY3NzJyxcbiAgICAgICAgICAgICAgICAnQGNvZGVtaXJyb3IvbGFuZy1odG1sJyxcbiAgICAgICAgICAgICAgICAnQGNvZGVtaXJyb3IvbGFuZy1qYXZhc2NyaXB0JyxcbiAgICAgICAgICAgICAgICAnQGNvZGVtaXJyb3IvbGFuZy1qc29uJyxcbiAgICAgICAgICAgICAgICAnQGNvZGVtaXJyb3IvbGFuZ3VhZ2UnLFxuICAgICAgICAgICAgICAgICdAY29kZW1pcnJvci9zdGF0ZScsXG4gICAgICAgICAgICAgICAgJ0Bjb2RlbWlycm9yL3ZpZXcnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmVyOiB7XG4gICAgICAgICAgICBwb3J0OiA1MjgxLFxuICAgICAgICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgICAgICAgIGZzOiB7XG4gICAgICAgICAgICAgICAgYWxsb3c6IFtcbiAgICAgICAgICAgICAgICAgICAgbW9ub3JlcG9Sb290LFxuICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUobW9ub3JlcG9Sb290LCAnLi4nKSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5kaXJuYW1lKHZpdGVwcmVzc1RoZW1lKSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWllTm9kZU1vZHVsZXMsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBvcnQ6IDQyODEsXG4gICAgICAgICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBzc3I6IHtcbiAgICAgICAgICAgIG5vRXh0ZXJuYWw6IFsnQGJhYmVsL3J1bnRpbWUnLCAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQnLCAnQHZlcmJiL3ZpdGVwcmVzcy10aGVtZSddLFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAvLyBWaXRlUHJlc3Mgc3RpbGwgc2hpcHMgVml0ZSA1IFx1MjAxNCBtYXAgVFMgYCouanNgIGltcG9ydCBzcGVjaWZpZXJzIHRvIHNvdXJjZSBmaWxlcy5cbiAgICAgICAgICAgIGV4dGVuc2lvbkFsaWFzOiB7XG4gICAgICAgICAgICAgICAgJy5qcyc6IFsnLnRzJywgJy50c3gnLCAnLmpzJywgJy5qc3gnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGlhczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFya2Rvd24taXQgaW1wb3J0cyBgcHVueWNvZGUuanNgOyBwYWNrYWdlIFwibWFpblwiIGlzIENKUyB3aXRob3V0IGRlZmF1bHQgZXhwb3J0LlxuICAgICAgICAgICAgICAgICAgICBmaW5kOiAncHVueWNvZGUuanMnLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKG1vbm9yZXBvUm9vdCwgJ25vZGVfbW9kdWxlcy9wdW55Y29kZS5qcy9wdW55Y29kZS5lczYuanMnKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ2xvZGFzaC1lcycsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4obW9ub3JlcG9Sb290LCAnbm9kZV9tb2R1bGVzL2xvZGFzaC1lcycpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAnbWFyay5qcy9zcmMvdmFuaWxsYS5qcycsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4obW9ub3JlcG9Sb290LCAnbm9kZV9tb2R1bGVzL21hcmsuanMvZGlzdC9tYXJrLmVzNi5qcycpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAnQHZlcmJiL3ZpdGVwcmVzcy10aGVtZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiB2aXRlcHJlc3NUaGVtZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4oZm9ybWllTm9kZU1vZHVsZXMsICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0Bmb3J0YXdlc29tZS9wcm8tcmVndWxhci1zdmctaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKGZvcm1pZU5vZGVNb2R1bGVzLCAnQGZvcnRhd2Vzb21lL3Byby1yZWd1bGFyLXN2Zy1pY29ucycpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAnQGZvcnRhd2Vzb21lL3Byby1zb2xpZC1zdmctaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKGZvcm1pZU5vZGVNb2R1bGVzLCAnQGZvcnRhd2Vzb21lL3Byby1zb2xpZC1zdmctaWNvbnMnKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZScsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4oZm9ybWllTm9kZU1vZHVsZXMsICdAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWUnKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0B2ZXJiYi9wbHVnaW4ta2l0JyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC1jb3JlL3NyYy9pbmRleC50cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAnQHZlcmJiL3BsdWdpbi1raXQtY29kZW1pcnJvci1jb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC1jb2RlbWlycm9yLWNvcmUvc3JjL2luZGV4LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmQ6ICdAdmVyYmIvcGx1Z2luLWtpdC1pY29ucy9hbGwuanMnLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8uLi9wbHVnaW4ta2l0LWljb25zL3NyYy9hbGwudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0B2ZXJiYi9wbHVnaW4ta2l0LWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC1pY29ucy9zcmMvaW5kZXgudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmluZDogJ0B2ZXJiYi9wbHVnaW4ta2l0LXRpcHRhcC1jb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC10aXB0YXAtY29yZS9zcmMvaW5kZXgudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlc2VydmUgVml0ZSBxdWVyeSBzdWZmaXhlcyAoYD9pbmxpbmVgKSB3aGVuIHJld3JpdGluZyBDU1Mvc3VicGF0aCBpbXBvcnRzLlxuICAgICAgICAgICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtd2ViXFwvdG9rZW5zXFwuY3NzKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke2ZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC13ZWIvc3JjL3Rva2Vucy90b2tlbnMuY3NzJywgaW1wb3J0Lm1ldGEudXJsKSl9JDFgLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtd2ViXFwvc3R5bGVzXFwvdXRpbGl0aWVzXFwvZm91Y2VcXC5jc3MoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogYCR7ZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8uLi9wbHVnaW4ta2l0LXdlYi9zcmMvc3R5bGVzL3V0aWxpdGllcy9mb3VjZS5jc3MnLCBpbXBvcnQubWV0YS51cmwpKX0kMWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmQ6IC9eQHZlcmJiXFwvcGx1Z2luLWtpdC13ZWJcXC9zdHlsZXNcXC9vdmVybGF5LWNvbnRlbnRcXC5jc3MoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogYCR7ZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi8uLi9wbHVnaW4ta2l0LXdlYi9zcmMvc3R5bGVzL292ZXJsYXktY29udGVudC5jc3MnLCBpbXBvcnQubWV0YS51cmwpKX0kMWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRpcFRhcCBzcGxpdCBmYW1pbGllcyAobm90ICovaW5kZXgudHMpLlxuICAgICAgICAgICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtd2ViXFwvY29tcG9uZW50c1xcL3RpcHRhcC0oY29udGVudHxlZGl0b3J8aW5wdXQpXFwuanMkLyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BsdWdpbktpdFdlYlNyY30vY29tcG9uZW50cy90aXB0YXAvcGstdGlwdGFwLSQxLnRzYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnQgZmFtaWx5IGJhcnJlbHM6IGNvbXBvbmVudHMvYnV0dG9uLmpzIFx1MjE5MiBjb21wb25lbnRzL2J1dHRvbi9pbmRleC50c1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtd2ViXFwvY29tcG9uZW50c1xcLyhbXi9dKylcXC5qcyQvLFxuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogYCR7cGx1Z2luS2l0V2ViU3JjfS9jb21wb25lbnRzLyQxL2luZGV4LnRzYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcG9uZW50IC8gZGVlcCBpbXBvcnRzIGJlZm9yZSB0aGUgcGFja2FnZSByb290IGFsaWFzIChgJDFgID0gcGF0aCB1bmRlciBzcmMvKS5cbiAgICAgICAgICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXdlYlxcLyguKikkLyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3BsdWdpbktpdFdlYlNyY30vJDFgLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaW5kOiAnQHZlcmJiL3BsdWdpbi1raXQtd2ViJyxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vLi4vcGx1Z2luLWtpdC13ZWIvc3JjL2luZGV4LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyBDYW5vbmljYWwgUmVhY3QgYWRhcHRlcnMgKG5vdCBzcy9wbHVnaW4ta2l0LXJlYWN0KS5cbiAgICAgICAgICAgICAgICAuLi5nZXRQbHVnaW5LaXRSZWFjdFZpdGVEZXZBbGlhc2VzKCksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGVkdXBlOiBbXG4gICAgICAgICAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgICAgICAgICAncmVhY3QtZG9tJyxcbiAgICAgICAgICAgICAgICAncmVhY3QtZG9tL2NsaWVudCcsXG4gICAgICAgICAgICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICAgICAgICAgICAgICAncmVhY3QvanN4LWRldi1ydW50aW1lJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbnM6IFttb25vcmVwb05vZGVNb2R1bGVzKCksIHRhaWx3aW5kY3NzKCldLFxuICAgIH0sXG4gICAgaGVhZDogW1xuICAgICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsIGhyZWY6ICcvcGx1Z2luLWtpdC9mYXZpY29uLnN2ZycgfV0sXG4gICAgXSxcbiAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICBsb2dvOiAnL3BsdWdpbi1raXQtcmVhY3QtbG9nby5zdmcnLFxuICAgICAgICBzaXRlVGl0bGU6ICdQbHVnaW4gS2l0JyxcbiAgICAgICAgZG9jc1RoZW1lOiB7XG4gICAgICAgICAgICBob21lTGluazogJy9wbHVnaW4ta2l0LycsXG4gICAgICAgICAgICBwcmltYXJ5OiAnI2U2NGQ0YycsXG4gICAgICAgIH0sXG4gICAgICAgIG5hdjogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL292ZXJ2aWV3LycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1dlYicsIGxpbms6ICcvd2ViLycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1JlYWN0JywgbGluazogJy9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvb3ZlcnZpZXcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdWdWUnLCBsaW5rOiAnL3Z1ZS8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdGb3JtcycsIGxpbms6ICcvZm9ybXMvJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnVGlwdGFwJywgbGluazogJy90aXB0YXAvJyB9LFxuICAgICAgICBdLFxuICAgICAgICBzaWRlYmFyOiB7XG4gICAgICAgICAgICAnL292ZXJ2aWV3Lyc6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdQbHVnaW4gS2l0JyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy9vdmVydmlldy8nIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnL3dlYi8nOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy93ZWIvJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUXVpY2sgU3RhcnQnLCBsaW5rOiAnL3dlYi9nZXR0aW5nLXN0YXJ0ZWQvcXVpY2stc3RhcnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdOby1CdWlsZCBTdGVwJywgbGluazogJy93ZWIvZ2V0dGluZy1zdGFydGVkL25vLWJ1aWxkLXN0ZXAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUb2tlbnMgJiBDU1MnLCBsaW5rOiAnL3dlYi9nZXR0aW5nLXN0YXJ0ZWQvdG9rZW5zJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVkdWNpbmcgRk9VQ0UnLCBsaW5rOiAnL3dlYi9nZXR0aW5nLXN0YXJ0ZWQvZm91Y2UnIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHdlYkNvbXBvbmVudEl0ZW1zLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJy92dWUvJzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvdnVlLycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1F1aWNrIFN0YXJ0JywgbGluazogJy92dWUvZ2V0dGluZy1zdGFydGVkL3F1aWNrLXN0YXJ0JyB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQXBwJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0NyZWF0aW5nIGEgVnVlIEFwcCcsIGxpbms6ICcvdnVlL2FwcC9jcmVhdGluZy1hLXZ1ZS1hcHAnIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnL2Zvcm1zLyc6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdGb3JtcycsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvZm9ybXMvJyB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJy90aXB0YXAvJzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1RpcHRhcCcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvdGlwdGFwLycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0phdmFTY3JpcHQgKGBAdmVyYmIvcGx1Z2luLWtpdC10aXB0YXAtY29yZWApJywgbGluazogJy90aXB0YXAvamF2YXNjcmlwdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1BIUCAoYHZlcmJiL3RpcHRhcGApJywgbGluazogJy90aXB0YXAvcGhwJyB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJy9yZWFjdC8nOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJywgaXRlbXM6IHJlYWN0R2V0dGluZ1N0YXJ0ZWQgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdSZWFjdCBBcHAnLCBpdGVtczogcmVhY3RBcHBJdGVtcyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0NvbXBvbmVudHMnLCBpdGVtczogcmVhY3RDb21wb25lbnRJdGVtcyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NjaGVtYUZvcm0nLCBpdGVtczogcmVhY3RGb3Jtc0l0ZW1zIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQVBJIFJlZmVyZW5jZScsIGl0ZW1zOiByZWFjdEFwaUl0ZW1zIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVjaXBlcycsIGl0ZW1zOiByZWFjdFJlY2lwZUl0ZW1zIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBzb2NpYWxMaW5rczogW3sgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmVyYmIvcGx1Z2luLWtpdCcgfV0sXG4gICAgICAgIGVkaXRMaW5rOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZlcmJiL3BsdWdpbi1raXQvZWRpdC9tYWluL2RvY3MvOnBhdGgnLFxuICAgICAgICAgICAgdGV4dDogJ0VkaXQgdGhpcyBwYWdlJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0bGluZTogWzIsIDNdLFxuICAgICAgICBsYXN0VXBkYXRlZFRleHQ6ICdMYXN0IHVwZGF0ZWQnLFxuICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiAnbG9jYWwnLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pvc2hjcmF3Zm9yZC9wdWJsaWNfaHRtbC9wbHVnaW4ta2l0LTIvcGx1Z2luLWtpdC1yZXBvL3BsdWdpbi1raXQtcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qb3NoY3Jhd2ZvcmQvcHVibGljX2h0bWwvcGx1Z2luLWtpdC0yL3BsdWdpbi1raXQtcmVwby9wbHVnaW4ta2l0LXJlYWN0L3ZpdGUtZGV2Lm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvam9zaGNyYXdmb3JkL3B1YmxpY19odG1sL3BsdWdpbi1raXQtMi9wbHVnaW4ta2l0LXJlcG8vcGx1Z2luLWtpdC1yZWFjdC92aXRlLWRldi5tanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLicsIGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3Qgc3JjUm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG5jb25zdCBwa2dSb290ID0gX19kaXJuYW1lO1xuXG4vKipcbiAqIFZpdGUgYHJlc29sdmUuYWxpYXNgIGVudHJpZXMgc28gYXBwcyBjYW4gY29tcGlsZSBgQHZlcmJiL3BsdWdpbi1raXQtcmVhY3RgIGZyb20gYHNyYy9gXG4gKiBkdXJpbmcgYHZpdGVgIGRldiAoSE1SKS4gUHJvZHVjdGlvbiBidWlsZHMgc2hvdWxkIHVzZSBgZXhwb3J0c2AgXHUyMTkyIGBkaXN0L2AuXG4gKlxuICogTWlycm9ycyBwdWJsaWMgYHBhY2thZ2UuanNvbmAgYGV4cG9ydHNgIHN1YnBhdGhzIChleGNlcHQgYHBhY2thZ2UuanNvbmApLlxuICogUmVxdWlyZWQgYmVjYXVzZSBpbi1wYWNrYWdlIHNvdXJjZSBmaWxlcyBpbXBvcnQgdmlhIHRob3NlIHB1YmxpYyBzdWJwYXRoc1xuICogKGUuZy4gYEB2ZXJiYi9wbHVnaW4ta2l0LXJlYWN0L3V0aWxzYCksIHdoaWNoIG11c3Qgbm90IGZhbGwgdGhyb3VnaCB0byB0aGUgYmFyZVxuICogcGFja2FnZSBhbGlhcyAoYFx1MjAyNi9zcmMvaW5kZXgudHMvdXRpbHNgKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbktpdFJlYWN0Vml0ZURldkFsaWFzZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0XFwvc3R5bGVcXC5jc3MoXFw/LiopPyQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3Jlc29sdmUocGtnUm9vdCwgJ3N0eWxlLmNzcycpfSQxYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0XFwvdGFpbHdpbmQtdGhlbWVcXC5jc3MoXFw/LiopPyQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3Jlc29sdmUocGtnUm9vdCwgJ3RhaWx3aW5kLXRoZW1lLmNzcycpfSQxYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0XFwvdGFpbHdpbmQtcHJlZmxpZ2h0LXNjb3BlXFwuY3NzKFxcPy4qKT8kLyxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtyZXNvbHZlKHBrZ1Jvb3QsICd0YWlsd2luZC1wcmVmbGlnaHQtc2NvcGUuY3NzJyl9JDFgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtcmVhY3RcXC9jb21wb25lbnRzJC8sXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShzcmNSb290LCAnY29tcG9uZW50cy9pbmRleC50cycpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtcmVhY3RcXC9jb21wb25lbnRzXFwvKC4rKSQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3NyY1Jvb3R9L2NvbXBvbmVudHMvJDFgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtcmVhY3RcXC9mb3JtcyQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoc3JjUm9vdCwgJ2Zvcm1zL2luZGV4LnRzJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbmQ6IC9eQHZlcmJiXFwvcGx1Z2luLWtpdC1yZWFjdFxcL2Zvcm1zXFwvKC4rKSQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3NyY1Jvb3R9L2Zvcm1zLyQxYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0XFwvaG9va3MkLyxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKHNyY1Jvb3QsICdob29rcy9pbmRleC50cycpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtcmVhY3RcXC9ob29rc1xcLyguKykkLyxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtzcmNSb290fS9ob29rcy8kMWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbmQ6IC9eQHZlcmJiXFwvcGx1Z2luLWtpdC1yZWFjdFxcL2ZhdWx0JC8sXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShzcmNSb290LCAnZmF1bHQvaW5kZXgudHMnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0XFwvZmF1bHRcXC8oLispJC8sXG4gICAgICAgICAgICByZXBsYWNlbWVudDogYCR7c3JjUm9vdH0vZmF1bHQvJDFgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAvXkB2ZXJiYlxcL3BsdWdpbi1raXQtcmVhY3RcXC91dGlscyQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoc3JjUm9vdCwgJ3V0aWxzL2luZGV4LnRzJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpbmQ6IC9eQHZlcmJiXFwvcGx1Z2luLWtpdC1yZWFjdFxcL3V0aWxzXFwvKC4rKSQvLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IGAke3NyY1Jvb3R9L3V0aWxzLyQxYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZmluZDogL15AdmVyYmJcXC9wbHVnaW4ta2l0LXJlYWN0JC8sXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShzcmNSb290LCAnaW5kZXgudHMnKSxcbiAgICAgICAgfSxcbiAgICBdO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WSxTQUFTLGtCQUFrQjtBQUN6YSxTQUFTLGlCQUFBQSxnQkFBZSxxQkFBcUI7QUFDN0MsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBRTlCLE9B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T0FBTyxvQkFBb0I7QUFBQSxRQUNqRCxFQUFFLE1BQU0sY0FBYyxPQUFPLGdCQUFnQjtBQUFBLFFBQzdDLEVBQUUsTUFBTSxpQkFBaUIsT0FBTyxjQUFjO0FBQUEsUUFDOUMsRUFBRSxNQUFNLFdBQVcsT0FBTyxpQkFBaUI7QUFBQSxNQUMvQztBQUFBLElBQ0o7QUFBQSxJQUNBLGFBQWEsQ0FBQyxFQUFFLE1BQU0sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQUEsSUFDN0UsVUFBVTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLFFBQVE7QUFBQSxNQUNKLFVBQVU7QUFBQSxJQUNkO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJmaWxlVVJMVG9QYXRoIl0KfQo=
