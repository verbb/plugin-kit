let basePath = '';

export function setBasePath(path: string): void {
    basePath = path;
}

export function getBasePath(subpath = ''): string {
    if (!basePath) {
        const el = document.querySelector('[data-plugin-kit]');

        if (el?.hasAttribute('data-plugin-kit')) {
            const rootRelativeUrl = new URL(el.getAttribute('data-plugin-kit') ?? '', window.location.href).pathname;
            setBasePath(rootRelativeUrl);
        } else {
            const scripts = [...document.getElementsByTagName('script')];
            const pkScript = scripts.find(
                (script) =>
                    script.src.endsWith('plugin-kit.js') || script.src.endsWith('plugin-kit.loader.js'),
            );

            if (pkScript) {
                const path = String(pkScript.getAttribute('src'));
                setBasePath(path.split('/').slice(0, -1).join('/'));
            }
        }
    }

    return basePath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : '');
}
