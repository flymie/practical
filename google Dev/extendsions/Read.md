##声明 Content Scripts
#####声明的 Content Scripts 非常的简单，我们只需要在 manifest.json 文件中声明即可
```javascript
{
  "version": "0.0.1",
  "name": "welearnmore-content_scripts",
  "manifest_version": 2,
  "description": "welearnmore",
  "content_scripts": [
    {
      "matches": ["https://icepy.me/*"],
      "js": ["content_scripts.js"]
    }
  ],
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self';"
}
```
