# chrome-proxy-manager — Proxy Settings for Chrome Extensions
> **Built by [Zovo](https://zovo.one)**

Configure HTTP/SOCKS/PAC proxies, bypass lists, system/direct modes, and error handling. `npm i chrome-proxy-manager`

```typescript
import { ProxyManager } from 'chrome-proxy-manager';
await ProxyManager.setProxy({ host: '10.0.0.1', port: 8080, scheme: 'http' });
await ProxyManager.useDirect(); // Disable proxy
```
MIT License
