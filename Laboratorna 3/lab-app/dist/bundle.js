/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ \"./src/services.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n\n\n\nvar App = (function () {\n    function App() {\n        this.service = new _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService();\n        this.initForm();\n        this.initUserForm();\n    }\n    App.prototype.initForm = function () {\n        var _this = this;\n        var form = document.getElementById('addBookForm');\n        if (!form)\n            return;\n        var titleInput = document.getElementById('title');\n        var authorInput = document.getElementById('author');\n        var yearInput = document.getElementById('year');\n        var yearFeedback = document.getElementById('yearFeedback');\n        form.addEventListener('submit', function (e) {\n            e.preventDefault();\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(titleInput.value)) {\n                titleInput.classList.add('is-invalid');\n            }\n            else {\n                titleInput.classList.remove('is-invalid');\n            }\n            var yearRes = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.year(yearInput.value);\n            if (!yearRes.valid) {\n                yearInput.classList.add('is-invalid');\n                if (yearFeedback && yearRes.message)\n                    yearFeedback.textContent = yearRes.message;\n            }\n            else {\n                yearInput.classList.remove('is-invalid');\n                if (yearFeedback)\n                    yearFeedback.textContent = '';\n            }\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(authorInput.value)) {\n                authorInput.classList.add('is-invalid');\n            }\n            else {\n                authorInput.classList.remove('is-invalid');\n            }\n            var isValid = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(titleInput.value) && yearRes.valid && _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(authorInput.value);\n            if (!isValid)\n                return;\n            var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book({\n                title: titleInput.value.trim(),\n                author: authorInput.value.trim() || undefined,\n                year: yearInput.value.trim() ? Number(yearInput.value.trim()) : undefined,\n            });\n            _this.service.add(book);\n            form.reset();\n            titleInput.classList.remove('is-invalid');\n            yearInput.classList.remove('is-invalid');\n        });\n    };\n    App.prototype.initUserForm = function () {\n        var _this = this;\n        var form = document.getElementById('addUserForm');\n        if (!form)\n            return;\n        var nameInput = document.getElementById('userName');\n        var emailInput = document.getElementById('userEmail');\n        var emailFeedback = document.getElementById('emailFeedback');\n        form.addEventListener('submit', function (e) {\n            e.preventDefault();\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(nameInput.value)) {\n                nameInput.classList.add('is-invalid');\n            }\n            else {\n                nameInput.classList.remove('is-invalid');\n            }\n            var emailValid = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.email(emailInput.value);\n            if (!emailValid) {\n                emailInput.classList.add('is-invalid');\n                if (emailFeedback)\n                    emailFeedback.textContent = 'Некоректний email';\n            }\n            else {\n                emailInput.classList.remove('is-invalid');\n                if (emailFeedback)\n                    emailFeedback.textContent = '';\n            }\n            if (!(_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(nameInput.value) && emailValid))\n                return;\n            var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User({ name: nameInput.value.trim(), email: emailInput.value.trim() });\n            _this.service.addUser(user);\n            form.reset();\n            nameInput.classList.remove('is-invalid');\n            emailInput.classList.remove('is-invalid');\n        });\n    };\n    return App;\n}());\ndocument.addEventListener('DOMContentLoaded', function () {\n    new App();\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?\n}");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nvar Book = (function () {\n    function Book(params) {\n        var _a, _b, _c;\n        this.id = (_c = (_a = params.id) !== null && _a !== void 0 ? _a : (_b = crypto.randomUUID) === null || _b === void 0 ? void 0 : _b.call(crypto)) !== null && _c !== void 0 ? _c : String(Date.now());\n        this.title = params.title;\n        this.author = params.author;\n        this.year = params.year;\n    }\n    return Book;\n}());\n\nvar User = (function () {\n    function User(params) {\n        var _a, _b, _c;\n        this.id = (_c = (_a = params.id) !== null && _a !== void 0 ? _a : (_b = crypto.randomUUID) === null || _b === void 0 ? void 0 : _b.call(crypto)) !== null && _c !== void 0 ? _c : String(Date.now());\n        this.name = params.name;\n        this.email = params.email;\n    }\n    return User;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?\n}");

/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\nvar LibraryService = (function () {\n    function LibraryService() {\n        this.storageKey = 'lab-app-books';\n        this.usersKey = 'lab-app-users';\n    }\n    LibraryService.prototype.getAll = function () {\n        var raw = localStorage.getItem(this.storageKey);\n        if (!raw)\n            return [];\n        try {\n            var parsed = JSON.parse(raw);\n            return parsed;\n        }\n        catch (_a) {\n            return [];\n        }\n    };\n    LibraryService.prototype.add = function (book) {\n        var all = this.getAll();\n        all.push(book);\n        localStorage.setItem(this.storageKey, JSON.stringify(all));\n    };\n    LibraryService.prototype.getAllUsers = function () {\n        var raw = localStorage.getItem(this.usersKey);\n        if (!raw)\n            return [];\n        try {\n            return JSON.parse(raw);\n        }\n        catch (_a) {\n            return [];\n        }\n    };\n    LibraryService.prototype.addUser = function (user) {\n        var all = this.getAllUsers();\n        all.push(user);\n        localStorage.setItem(this.usersKey, JSON.stringify(all));\n    };\n    return LibraryService;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?\n}");

/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validation: () => (/* binding */ Validation)\n/* harmony export */ });\nvar Validation = (function () {\n    function Validation() {\n    }\n    Validation.required = function (value) {\n        return value.trim().length > 0;\n    };\n    Validation.year = function (value) {\n        if (value.trim() === '')\n            return { valid: true };\n        var year = Number(value);\n        var current = new Date().getFullYear();\n        if (!Number.isInteger(year))\n            return { valid: false, message: 'Рік має бути цілим числом' };\n        if (year < 1400 || year > current)\n            return { valid: false, message: \"\\u0420\\u0456\\u043A \\u043C\\u0430\\u0454 \\u0431\\u0443\\u0442\\u0438 \\u0432 \\u043C\\u0435\\u0436\\u0430\\u0445 1400\\u2013\".concat(current) };\n        return { valid: true };\n    };\n    Validation.email = function (value) {\n        var re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/i;\n        return re.test(value.trim());\n    };\n    return Validation;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?\n}");

/***/ })

/******/ 	});
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;