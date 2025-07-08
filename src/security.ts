export const disableDevToolsInProd = () => {
    if (import.meta.env.PROD) {
        for (const method of ['log', 'warn', 'error', 'info', 'debug'] as const) {
            console[method] = () => {};
        }

        window.addEventListener('keydown', (e) => {
            const blocked =
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
                (e.ctrlKey && e.key.toUpperCase() === 'U');

            if (blocked) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        window.addEventListener('contextmenu', (e) => e.preventDefault());
    }
};
