import { css } from 'lit';

export const pkTiptapContentStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            /* Inherit light-DOM color/size (warning banners, badges). Tokens override when set. */
            color: var(--pk-tiptap-content-color, inherit);
            font-family: var(--pk-font-family);
            font-size: var(--pk-tiptap-content-font-size, inherit);
            line-height: var(--pk-tiptap-content-line-height, 1.4);
        }
    }
`;
