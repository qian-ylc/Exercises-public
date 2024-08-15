/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/

function* readLines(filePath) {
    const fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    let buf = new Buffer.alloc(1024);
    try {
        let fd = fs.openSync(filePath, 'r');
        let content = '';
        let readBytes = 0;
        while (true) {
            readBytes = fs.readSync(fd, buf, 0, buf.length, null);
            if (readBytes === 0) {
                break;
            }
            content += buf.toString('utf8', 0, readBytes);
        }
        let lines = content.split('\n');
        for (let line of lines) {
            yield line;
        }
    } catch (e) {
        console.log(e);
    } finally {
        fs.closeSync(fd);
    }
}
/******/ })()
;