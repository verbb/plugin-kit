import { renderWebPlaygroundInto } from '@verbb/plugin-kit-playground';

export function mountWebSurface(componentId: string, outlet: HTMLElement): () => void {
    renderWebPlaygroundInto(componentId, outlet);

    return () => {
        outlet.replaceChildren();
    };
}
