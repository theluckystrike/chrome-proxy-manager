# chrome-proxy-manager

Manage Chrome extension proxy settings with PAC scripts and rules.

## Overview

chrome-proxy-manager provides utilities to configure proxy settings, PAC scripts, and proxy rules for Chrome extensions.

## Installation

```bash
npm install chrome-proxy-manager
```

## Usage

### Set Proxy Rules

```javascript
import { ProxyManager } from 'chrome-proxy-manager';

const proxy = new ProxyManager();

// Direct connection (no proxy)
await proxy.setDirect();

// Use a specific proxy server
await proxy.setProxy({
  scheme: 'socks5',
  host: 'proxy.example.com',
  port: 1080,
});

// Proxy per scheme
await proxy.setProxyRules({
  http: 'proxy1.example.com:8080',
  https: 'proxy2.example.com:8080',
});
```

### PAC Script

```javascript
await proxy.setPacScript(`
  function FindProxyForURL(url, host) {
    if (isPlainHostName(host)) {
      return "DIRECT";
    }
    return "SOCKS proxy.example.com:1080";
  }
`);
```

### Proxy Bypass List

```javascript
await proxy.setBypassList([
  'localhost',
  '*.internal.company.com',
  '127.0.0.1',
]);
```

## API

### Methods

- `setDirect()` - No proxy (direct connection)
- `setProxy(config)` - Set proxy server
- `setProxyRules(rules)` - Set rules per scheme
- `setPacScript(script)` - Set PAC script
- `setBypassList(hosts)` - Set bypass list
- `getSettings()` - Get current proxy settings
- `clear()` - Clear all proxy settings

## Manifest

```json
{
  "permissions": ["proxy"]
}
```

## Browser Support

- Chrome 90+

## License

MIT
