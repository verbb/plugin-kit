type RowGeometry = {
    element: HTMLTableRowElement;
    top: number;
    height: number;
};

type DragSession = {
    handle: HTMLButtonElement;
    body: HTMLTableSectionElement;
    width: number;
    rows: RowGeometry[];
    fromIndex: number;
    toIndex: number;
    pointerId: number;
    startY: number;
    pointerY: number;
    grabOffset: number;
    moved: boolean;
    scrollParents: HTMLElement[];
    cleanup: () => void;
};

/** Preview with transforms so Lit retains ownership of row order and custom cell instances. */
export class DataTableRowOrderController {
    private session?: DragSession;
    private frame?: number;

    constructor(
        private enabled: () => boolean,
        private commit: (fromIndex: number, toIndex: number) => void,
        private cancelled: () => void,
    ) {}

    get active(): boolean {
        return Boolean(this.session);
    }

    start(event: PointerEvent): void {
        if (!this.enabled() || this.session || event.button !== 0 || !event.isPrimary)
            return;
        const handle = event.currentTarget as HTMLButtonElement;
        const source = handle.closest('tr');
        const body = source?.parentElement;
        if (!source || !(body instanceof HTMLTableSectionElement)) return;
        const bounds = body.getBoundingClientRect();
        const rows = [...body.rows].map((element) => {
            const rect = element.getBoundingClientRect();
            return { element, top: rect.top - bounds.top, height: rect.height };
        });
        const fromIndex = rows.findIndex((row) => row.element === source);
        if (fromIndex < 0 || rows.length < 2) return;
        event.preventDefault();
        handle.focus({ preventScroll: true });

        const move = (event: PointerEvent) => {
            const session = this.session;
            if (!session || event.pointerId !== session.pointerId) return;
            event.preventDefault();
            session.pointerY = event.clientY;
            if (!session.moved && Math.abs(event.clientY - session.startY) < 4) return;
            session.moved = true;
            body.setAttribute('data-row-dragging', '');
            source.setAttribute('data-dragging', '');
            this.preview();
        };
        const finish = (event: PointerEvent) => {
            const session = this.session;
            if (!session || event.pointerId !== session.pointerId) return;
            const commit = event.type === 'pointerup' && session.moved && this.enabled();
            this.cancel(false);
            if (commit) this.commit(session.fromIndex, session.toIndex);
        };
        const keydown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            event.preventDefault();
            event.stopPropagation();
            this.cancel();
        };
        const cancel = () => this.cancel();
        const doc = handle.ownerDocument;
        const win = doc.defaultView!;
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', finish);
        handle.addEventListener('pointercancel', cancel);
        handle.addEventListener('lostpointercapture', cancel);
        doc.addEventListener('keydown', keydown, true);
        win.addEventListener('blur', cancel);
        win.addEventListener('resize', cancel);
        this.session = {
            handle, body, width: bounds.width, rows, fromIndex, toIndex: fromIndex,
            pointerId: event.pointerId, startY: event.clientY, pointerY: event.clientY,
            grabOffset: event.clientY - source.getBoundingClientRect().top,
            moved: false,
            scrollParents: this.scrollParents(body),
            cleanup: () => {
                handle.removeEventListener('pointermove', move);
                handle.removeEventListener('pointerup', finish);
                handle.removeEventListener('pointercancel', cancel);
                handle.removeEventListener('lostpointercapture', cancel);
                doc.removeEventListener('keydown', keydown, true);
                win.removeEventListener('blur', cancel);
                win.removeEventListener('resize', cancel);
            },
        };
        handle.setPointerCapture(event.pointerId);
    }

    cancel(announce = true): void {
        const session = this.session;
        this.session = undefined;
        if (this.frame !== undefined) cancelAnimationFrame(this.frame);
        this.frame = undefined;
        if (!session) return;
        session.cleanup();
        session.body.removeAttribute('data-row-dragging');
        for (const row of session.rows) {
            row.element.style.removeProperty('transform');
            row.element.removeAttribute('data-dragging');
        }
        if (session.handle.hasPointerCapture(session.pointerId))
            session.handle.releasePointerCapture(session.pointerId);
        if (announce && session.moved) this.cancelled();
    }

    checkGeometry(): void {
        const session = this.session;
        if (!session) return;
        // ResizeObserver can deliver a pre-drag resize late. Only invalidate changed geometry.
        if (Math.abs(session.body.getBoundingClientRect().width - session.width) > 0.5 ||
            session.rows.some((row) => Math.abs(row.element.getBoundingClientRect().height - row.height) > 0.5))
            this.cancel();
    }

    private preview(): void {
        const session = this.session;
        if (!session?.moved) return;
        if (!this.enabled()) {
            this.cancel();
            return;
        }
        const { rows, fromIndex, body } = session;
        const source = rows[fromIndex];
        const last = rows.at(-1)!;
        const desiredTop = session.pointerY - session.grabOffset - body.getBoundingClientRect().top;
        const top = Math.max(0, Math.min(desiredTop, last.top + last.height - source.height));
        // Use the pointer's unbounded probe for insertion. Clamping it with the visual row
        // would prevent a tall row reaching either end when its neighbours are shorter.
        const center = desiredTop + source.height / 2;
        session.toIndex = rows.filter((row, index) =>
            index !== fromIndex && center > row.top + row.height / 2,
        ).length;
        for (const [index, row] of rows.entries()) {
            const offset = index === fromIndex
                ? top - row.top
                : index > fromIndex && index <= session.toIndex
                  ? -source.height
                  : index < fromIndex && index >= session.toIndex
                    ? source.height
                    : 0;
            row.element.style.transform = `translateY(${offset}px)`;
        }
        if (this.frame !== undefined) cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
            this.frame = undefined;
            if (this.session !== session) return;
            this.autoScroll(session);
            // Also follow scrolling initiated by a trackpad or an enclosing scroll container.
            this.preview();
        });
    }

    private scrollParents(element: HTMLElement): HTMLElement[] {
        const parents: HTMLElement[] = [];
        const doc = element.ownerDocument;
        let parent: Element | null = element;
        while (parent) {
            if (parent instanceof HTMLElement &&
                /(auto|scroll)/.test(getComputedStyle(parent).overflowY) &&
                parent.scrollHeight > parent.clientHeight)
                parents.push(parent);
            const root: Node = parent.getRootNode();
            parent = parent.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
        }
        if (doc.scrollingElement instanceof HTMLElement && !parents.includes(doc.scrollingElement))
            parents.push(doc.scrollingElement);
        return parents;
    }

    private autoScroll(session: DragSession): void {
        const win = session.handle.ownerDocument.defaultView!;
        for (const parent of session.scrollParents) {
            const viewport = parent === parent.ownerDocument.scrollingElement;
            const bounds = parent.getBoundingClientRect();
            const top = viewport ? 0 : Math.max(0, bounds.top);
            const bottom = viewport ? win.innerHeight : Math.min(win.innerHeight, bounds.bottom);
            const delta = session.pointerY < top + 32 ? -10
                : session.pointerY > bottom - 32 ? 10 : 0;
            if (delta && (delta < 0 ? parent.scrollTop > 0
                : parent.scrollTop + parent.clientHeight < parent.scrollHeight)) {
                parent.scrollTop += delta;
                break;
            }
        }
    }
}
