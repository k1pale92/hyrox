// hyrox_app.html(원본) → index.html(설치형 웹앱). 원본을 고친 뒤 `node build.js`로 다시 만든다.
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'hyrox_app.html'), 'utf8');
const cut = src.indexOf('<div class="bgfx"');
if (cut < 0) throw new Error('bgfx marker not found');
const head = src.slice(0, cut), body = src.slice(cut);
const html = '<!doctype html>\n<html lang="ko">\n<head>\n' +
  '<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' +
  '<meta name="theme-color" content="#0c1132">\n' +
  '<meta name="mobile-web-app-capable" content="yes">\n' +
  '<meta name="apple-mobile-web-app-capable" content="yes">\n' +
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n' +
  '<meta name="apple-mobile-web-app-title" content="하이록스">\n' +
  '<link rel="manifest" href="manifest.webmanifest">\n' +
  '<link rel="icon" type="image/png" href="icon-192.png">\n' +
  '<link rel="apple-touch-icon" href="icon-192.png">\n' +
  '<style>html,body{margin:0}[hidden]{display:none!important}img{max-width:100%}:root{padding-top:env(safe-area-inset-top,0px)}</style>\n' +
  head + '</head>\n<body>\n' + body + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
// 캐시 버전을 내용 해시로 바꿔서 새 버전이 폰에 반영되게 한다
const hash = require('crypto').createHash('sha1').update(html).digest('hex').slice(0, 8);
const swPath = path.join(__dirname, 'sw.js');
fs.writeFileSync(swPath, fs.readFileSync(swPath, 'utf8').replace(/const VERSION = '[^']*'/, "const VERSION = '" + hash + "'"));
console.log('index.html', html.length, 'bytes · sw version', hash);
