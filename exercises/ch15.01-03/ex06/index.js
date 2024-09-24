// ページの要素
const date = document.querySelector('#date');
const browser = document.querySelector('#browser');
const os = document.querySelector('#os');
const network = document.querySelector('#network');

// ブラウザの種類とバージョンを取得
const userAgent = navigator.userAgent.toLowerCase();
let browserType;
let browserVersion;
if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
    browserType = 'Internet Explorer';
    const match = userAgent.match(/(?:msie |rv:)(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else if (userAgent.indexOf('edge') != -1) {
    browserType = 'Edge';
    const match = userAgent.match(/edge\/(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else if (userAgent.indexOf('chrome') != -1) {
    browserType = 'Chrome';
    const match = userAgent.match(/chrome\/(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else if (userAgent.indexOf('safari') != -1) {
    browserType = 'Safari';
    const match = userAgent.match(/version\/(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else if (userAgent.indexOf('firefox') != -1) {
    browserType = 'Firefox';
    const match = userAgent.match(/firefox\/(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else if (userAgent.indexOf('opera') != -1) {
    browserType = 'Opera';
    const match = userAgent.match(/opera\/(\d+(\.\d+)?)/);
    browserVersion = match ? match[1] : 'unknown';
} else {
    browserType = 'Other';
    browserVersion = 'unknown';
}

date.textContent = new Date().toLocaleString();
browser.textContent = browserType + ' ' + browserVersion;
os.textContent = navigator.platform;
network.textContent = navigator.connection.effectiveType;