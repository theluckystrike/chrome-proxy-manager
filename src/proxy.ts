/**
 * Proxy Manager — Configure and manage Chrome proxy settings
 */
export interface ProxyConfig { host: string; port: number; scheme?: 'http' | 'https' | 'socks4' | 'socks5'; bypassList?: string[]; }

export class ProxyManager {
    /** Set HTTP proxy */
    static async setProxy(config: ProxyConfig): Promise<void> {
        await chrome.proxy.settings.set({
            value: {
                mode: 'fixed_servers', rules: {
                    singleProxy: { host: config.host, port: config.port, scheme: config.scheme || 'http' },
                    bypassList: config.bypassList || ['localhost', '127.0.0.1'],
                }
            }, scope: 'regular'
        });
    }

    /** Set PAC script URL */
    static async setPAC(url: string): Promise<void> {
        await chrome.proxy.settings.set({ value: { mode: 'pac_script', pacScript: { url } }, scope: 'regular' });
    }

    /** Set PAC script from data */
    static async setPACData(script: string): Promise<void> {
        await chrome.proxy.settings.set({ value: { mode: 'pac_script', pacScript: { data: script } }, scope: 'regular' });
    }

    /** Use system proxy */
    static async useSystem(): Promise<void> {
        await chrome.proxy.settings.set({ value: { mode: 'system' }, scope: 'regular' });
    }

    /** Use direct (no proxy) */
    static async useDirect(): Promise<void> {
        await chrome.proxy.settings.set({ value: { mode: 'direct' }, scope: 'regular' });
    }

    /** Auto-detect proxy */
    static async useAutoDetect(): Promise<void> {
        await chrome.proxy.settings.set({ value: { mode: 'auto_detect' }, scope: 'regular' });
    }

    /** Get current proxy settings */
    static async getCurrent(): Promise<unknown> {
        return new Promise((resolve) => { chrome.proxy.settings.get({}, (config) => resolve(config)); });
    }

    /** Clear proxy settings */
    static async clear(): Promise<void> { await chrome.proxy.settings.clear({}); }

    /** Listen for proxy errors */
    static onError(callback: (details: chrome.proxy.ErrorDetails) => void): void {
        chrome.proxy.onProxyError.addListener(callback);
    }
}
