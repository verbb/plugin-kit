# pk-button accessibility notes

Audit reference: [Button pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/button/),  `pk-button` (behavior reference only).

## Requirements

- [x] Native `<button>` in shadow DOM with `part="base"` for external hooks
- [x] `disabled` → native disabled + `aria-disabled` when loading
- [x] `loading` → `aria-busy="true"`, control remains disabled
- [x] Focus visible ring via `:focus-visible` (not `:focus` alone)
- [x] `:host` delegates focus to inner button (`delegatesFocus: true`)
- [x] Icon-only usage requires consumer `aria-label` on host (documented)
- [x] Named slots (`start`, default, `end`) preserve reading order

## Craft / Plugin Kit choices

- Variants: `default`, `primary`, `secondary`, `outline`, `transparent`, `link`, `dashed` 
- Sizes: Craft CP scale (`xxs` … `xl`); `none` skips the preset scale so `--pk-btn-*` tokens can be set on the host
- No `appearance` axis — folded into variant where needed

## Follow-ups

- [x] `type="submit|reset"` bridges to light-DOM `<form>` via `requestSubmit` / `reset` (shadow inner button is not a form owner); honors `form="id"` when the control is outside the form (dialog footer)
- [ ] Loading spinner slot + `aria-describedby` for long operations
