let componentIdCounter = 0;

export function createComponentId(prefix = 'pk'): string {
    componentIdCounter += 1;
    return `${prefix}-${componentIdCounter}`;
}
