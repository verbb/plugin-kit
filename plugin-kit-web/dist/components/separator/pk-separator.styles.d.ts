/**
 * Default block rhythm lives on the inner `.line`, not `:host` margin.
 *
 * Outer author styles (Tailwind preflight `* { margin: 0 }`, utilities, etc.) win
 * over shadow `:host` margins — so host margin cannot be the spacing mechanism
 * when kit sits next to a reset. Internal shadow margins are insulated.
 */
export declare const pkSeparatorStyles: import('lit').CSSResult;
//# sourceMappingURL=pk-separator.styles.d.ts.map