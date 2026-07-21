import MarkdownIt from "markdown-it";
//#region src/utils/markdown.ts
/**
* Lazily construct the markdown-it instance.
*
* Instantiating markdown-it at module scope is a live side effect: bundlers must
* retain the ~2.3 MB dependency in any consumer that touches this module's graph,
* even one that only imported a sibling util (e.g. `generateHandle`). Deferring the
* `new MarkdownIt()` to first render keeps markdown-it out of the graph unless a
* `render*` helper is actually called.
*
* markdown-it is configured with secure defaults:
* - HTML is disabled for security
* - Links are auto-detected
* - Typography features like smart quotes are enabled
* - Line breaks are converted to <br> tags
*/
function createMarkdownIt() {
	return new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true,
		breaks: true
	});
}
var mdInstance;
var getMd = () => mdInstance ??= createMarkdownIt();
/**
* Direct accessor to the shared markdown-it instance for advanced usage.
*
* Replaces the former eager `export { md }`: an exported pre-built instance is
* itself a module-level side effect and would defeat the lazy loading above.
* Call this only when you need the full markdown-it API.
*/
var getMarkdownIt = () => getMd();
/**
* Renders markdown content as block-level HTML
* Includes block elements like headers, paragraphs, lists etc.
*
* @param content - The markdown string to render
* @returns Rendered HTML string, or empty string if no content provided
*/
var renderMarkdown = (content) => {
	if (!content) return "";
	return getMd().render(content);
};
/**
* Renders markdown content as inline HTML only
* Excludes block-level elements, only processes inline markdown syntax
*
* @param content - The markdown string to render
* @returns Rendered HTML string, or empty string if no content provided
*/
var renderInlineMarkdown = (content) => {
	if (!content) return "";
	return getMd().renderInline(content);
};
//#endregion
export { getMarkdownIt, renderInlineMarkdown, renderMarkdown };

//# sourceMappingURL=markdown.js.map