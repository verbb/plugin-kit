# Legacy overlay components (archived)

Earlier implementations copied here for comparison and rollback.

| Component | Archived files |
|-----------|----------------|
| `pk-popup` | `popup/pk-popup.ts`, `popup/pk-popup.styles.ts` |
| `pk-dialog` | `dialog/pk-dialog.ts`, `dialog/pk-dialog.styles.ts` |
| `pk-dropdown-menu` | `dropdown-menu/pk-dropdown-menu.ts`, `dropdown-menu/pk-dropdown-menu.styles.ts` |
| `pk-select` | `select/pk-select.ts`, `select/pk-select.styles.ts` |

Active implementations follow  lifecycle order (Jul 2026 overlay isolation spike):

- Menu/select: `popup.active = false` **before** `pk-after-hide`
- Dialog: sync `showModal()` — no `top-layer.ts` demotion pass
- Popup: `start()` / `stop()` with popover API

**Styles (Jul 2026):** Craft styles restored from archived copies for dialog, popup, and dropdown-menu. Select styles were never replaced. Overlay lifecycle logic unchanged.

To restore legacy behavior (not just styles), copy files back into `../popup`, `../dialog`, etc.
