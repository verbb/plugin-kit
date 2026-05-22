# Testing and debugging

When a first React integration is not working, the problem is usually in the connection points between PHP, Craft, and the browser build, not in the component library itself.

Start with the simple checks below before digging into deeper package APIs.

## First checks

- Does your Craft page actually register the asset bundle?
- Does the page output the mount element your React entry is looking for?
- Did your Vite build produce the same filenames your asset bundle registers?
- Did you import `@verbb/plugin-kit-react/style.css`, or inject it into the shadow root if you are using Shadow DOM?
- Are you loading the page inside the Craft control panel, where `window.Craft` exists?

## If the page is blank

If nothing renders at all, check these first:

1. Open the browser console and look for a JavaScript error.
2. Confirm your asset bundle is loading the built `js` file on that page.
3. Confirm your selector matches the mount element exactly.
4. Confirm your React entry guards against a missing element.

This is the minimum safe pattern:

```tsx
const container = document.getElementById('my-plugin-root');

if (container) {
  createRoot(container).render(<App />);
}
```

If the selector is wrong, React will never mount.

## If the page renders but looks unstyled

This usually means the CSS did not load where the app is rendering.

Check which setup you are using:

- **Light DOM:** make sure your entry imports `@verbb/plugin-kit-react/style.css`
- **Shadow DOM:** make sure you injected the CSS into the shadow root, not just the page

If the app is in a shadow root, importing the stylesheet globally is not enough on its own.

## If Craft-specific features fail

Functions like `createCraftHostBridge()` depend on the Craft control panel environment.

If you see errors around `window.Craft` or host requests:

- make sure the page is actually running in the CP
- make sure Craft's CP assets are loaded first
- avoid calling Craft-specific helpers in isolated visual tests unless you provide your own mock bridge

If you need the deeper details, see [React App APIs](../api/react-app-apis.md).

## If dialogs, menus, or popovers appear in the wrong place

This is usually a portal problem.

It shows up more often when:

- your app is mounted in Shadow DOM
- a dialog appears behind the Craft header
- a popover renders outside the visible app area

In that case, check your `configurePluginKitReact()` setup and make sure the portal target matches the same DOM tree your app is rendered into. For broader Shadow DOM styling issues, see [CSS setup](./css-setup.md).

## If form schema components are missing

The schema form system expects its field and component types to be registered before rendering.

If you see warnings such as `Unknown form field type` or `Unknown form component`, make sure your calls to `registerFormComponents()` and `registerFormFields()` happen before the form engine renders.

## Package development tools

If you are contributing to `plugin-kit-react` itself rather than consuming it in your own plugin:

```bash
npm run test
npm run visual-tests:dev
```

- `npm run test` is useful for package-level utilities and hooks
- `npm run visual-tests:dev` is useful for checking component states visually in the bespoke visual-tests app

Most package consumers will do their real testing inside their own plugin project instead.
