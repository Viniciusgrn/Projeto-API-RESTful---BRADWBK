// Polyfill `global` for libraries that expect a Node-like global variable in the browser
// Some packages (e.g. older sockjs-client builds) reference `global` which is not
// defined in browsers. Assign it to window so those references work.
;(window as any).global = window as any

// Provide a minimal process.env to avoid other libs throwing when accessing process.env
;(window as any).process = (window as any).process || { env: {} }
