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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ \"./src/services.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ \"./src/modal.ts\");\n\n\n\n\nvar App = (function () {\n    function App() {\n        this.service = new _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService();\n        this.service.seedIfEmpty();\n        this.initForm();\n        this.initUserForm();\n        this.initModal();\n        this.render();\n    }\n    App.prototype.initForm = function () {\n        var _this = this;\n        var form = document.getElementById('addBookForm');\n        if (!form)\n            return;\n        var titleInput = document.getElementById('title');\n        var authorInput = document.getElementById('author');\n        var yearInput = document.getElementById('year');\n        var yearFeedback = document.getElementById('yearFeedback');\n        form.addEventListener('submit', function (e) {\n            e.preventDefault();\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(titleInput.value)) {\n                titleInput.classList.add('is-invalid');\n            }\n            else {\n                titleInput.classList.remove('is-invalid');\n            }\n            var yearRes = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.year(yearInput.value);\n            if (!yearRes.valid) {\n                yearInput.classList.add('is-invalid');\n                if (yearFeedback && yearRes.message)\n                    yearFeedback.textContent = yearRes.message;\n            }\n            else {\n                yearInput.classList.remove('is-invalid');\n                if (yearFeedback)\n                    yearFeedback.textContent = '';\n            }\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(authorInput.value)) {\n                authorInput.classList.add('is-invalid');\n            }\n            else {\n                authorInput.classList.remove('is-invalid');\n            }\n            var isValid = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(titleInput.value) && yearRes.valid && _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(authorInput.value);\n            if (!isValid)\n                return;\n            var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book({\n                title: titleInput.value.trim(),\n                author: authorInput.value.trim() || undefined,\n                year: yearInput.value.trim() ? Number(yearInput.value.trim()) : undefined,\n            });\n            _this.service.add(book);\n            form.reset();\n            titleInput.classList.remove('is-invalid');\n            yearInput.classList.remove('is-invalid');\n        });\n    };\n    App.prototype.initUserForm = function () {\n        var _this = this;\n        var form = document.getElementById('addUserForm');\n        if (!form)\n            return;\n        var nameInput = document.getElementById('userName');\n        var emailInput = document.getElementById('userEmail');\n        var emailFeedback = document.getElementById('emailFeedback');\n        form.addEventListener('submit', function (e) {\n            e.preventDefault();\n            if (!_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(nameInput.value)) {\n                nameInput.classList.add('is-invalid');\n            }\n            else {\n                nameInput.classList.remove('is-invalid');\n            }\n            var emailValid = _validation__WEBPACK_IMPORTED_MODULE_2__.Validation.email(emailInput.value);\n            if (!emailValid) {\n                emailInput.classList.add('is-invalid');\n                if (emailFeedback)\n                    emailFeedback.textContent = 'Некоректний email';\n            }\n            else {\n                emailInput.classList.remove('is-invalid');\n                if (emailFeedback)\n                    emailFeedback.textContent = '';\n            }\n            if (!(_validation__WEBPACK_IMPORTED_MODULE_2__.Validation.required(nameInput.value) && emailValid))\n                return;\n            var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User({ name: nameInput.value.trim(), email: emailInput.value.trim() });\n            _this.service.addUser(user);\n            form.reset();\n            nameInput.classList.remove('is-invalid');\n            emailInput.classList.remove('is-invalid');\n            _this.renderUsers();\n        });\n    };\n    App.prototype.initModal = function () {\n        var _this = this;\n        try {\n            this.modal = new _modal__WEBPACK_IMPORTED_MODULE_3__.Modal('#infoModal');\n            var closeBtn = document.getElementById('modalClose');\n            var okBtn = document.getElementById('modalOk');\n            var hide = function () { var _a; return (_a = _this.modal) === null || _a === void 0 ? void 0 : _a.hide(); };\n            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', hide);\n            okBtn === null || okBtn === void 0 ? void 0 : okBtn.addEventListener('click', hide);\n        }\n        catch (_a) { }\n    };\n    App.prototype.render = function () {\n        this.renderBooks();\n        this.renderUsers();\n    };\n    App.prototype.renderBooks = function () {\n        var _this = this;\n        var list = document.getElementById('booksList');\n        if (!list)\n            return;\n        list.innerHTML = '';\n        var books = this.service.getAll();\n        var users = this.service.getAllUsers();\n        books.forEach(function (b) {\n            var _a, _b;\n            var li = document.createElement('li');\n            li.className = 'list-group-item d-flex justify-content-between align-items-center';\n            var meta = document.createElement('div');\n            var author = b.author ? \" by \".concat(b.author) : '';\n            var year = b.year ? \" (\".concat(b.year, \")\") : '';\n            var status = b.borrowedByUserId\n                ? \" \\u2014 \\u041F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u043E: \".concat((_b = (_a = users.find(function (u) { return u.id === b.borrowedByUserId; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'невідомо')\n                : '';\n            meta.textContent = \"\".concat(b.title).concat(author).concat(year).concat(status);\n            var actions = document.createElement('div');\n            var borrowBtn = document.createElement('button');\n            borrowBtn.className = 'btn btn-sm btn-primary me-2';\n            borrowBtn.textContent = b.borrowedByUserId ? 'Повернути' : 'Позичити';\n            borrowBtn.addEventListener('click', function () { return _this.onBorrowReturn(b); });\n            var removeBtn = document.createElement('button');\n            removeBtn.className = 'btn btn-sm btn-outline-danger';\n            removeBtn.textContent = 'Видалити';\n            removeBtn.addEventListener('click', function () {\n                _this.service.remove(b.id);\n                _this.renderBooks();\n            });\n            actions.appendChild(borrowBtn);\n            actions.appendChild(removeBtn);\n            li.appendChild(meta);\n            li.appendChild(actions);\n            list.appendChild(li);\n        });\n    };\n    App.prototype.renderUsers = function () {\n        var list = document.getElementById('usersList');\n        if (!list)\n            return;\n        list.innerHTML = '';\n        this.service.getAllUsers().forEach(function (u) {\n            var li = document.createElement('li');\n            li.className = 'list-group-item';\n            li.textContent = \"\".concat(u.name, \" (\").concat(u.email, \")\");\n            list.appendChild(li);\n        });\n    };\n    App.prototype.onBorrowReturn = function (book) {\n        if (book.borrowedByUserId) {\n            this.service.returnBook(book.id);\n            this.renderBooks();\n            this.showInfo(\"\\u041A\\u043D\\u0438\\u0433\\u0443 \\u00AB\".concat(book.title, \"\\u00BB \\u043F\\u043E\\u0432\\u0435\\u0440\\u043D\\u0435\\u043D\\u043E.\"));\n            return;\n        }\n        var users = this.service.getAllUsers();\n        if (users.length === 0) {\n            this.showInfo('Немає користувачів для позичення. Додайте користувача.');\n            return;\n        }\n        var user = users[0];\n        var res = this.service.borrowBook(book.id, user.id);\n        if (res) {\n            this.renderBooks();\n            this.showInfo(\"\\u041A\\u043D\\u0438\\u0433\\u0443 \\u00AB\".concat(book.title, \"\\u00BB \\u043F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u043E \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0443 \").concat(user.name, \".\"));\n        }\n    };\n    App.prototype.showInfo = function (message) {\n        var _a;\n        var el = document.getElementById('modalMessage');\n        if (el)\n            el.textContent = message;\n        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.show();\n    };\n    return App;\n}());\ndocument.addEventListener('DOMContentLoaded', function () {\n    new App();\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?\n}");

/***/ }),

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\nvar Modal = (function () {\n    function Modal(selector) {\n        var el = document.querySelector(selector);\n        if (!el)\n            throw new Error(\"Modal element not found: \".concat(selector));\n        this.element = el;\n    }\n    Modal.prototype.show = function () {\n        this.element.classList.add('show');\n        this.element.style.display = 'block';\n        document.body.classList.add('modal-open');\n        var backdrop = document.createElement('div');\n        backdrop.className = 'modal-backdrop fade show';\n        backdrop.setAttribute('data-backdrop', 'true');\n        document.body.appendChild(backdrop);\n    };\n    Modal.prototype.hide = function () {\n        this.element.classList.remove('show');\n        this.element.style.display = 'none';\n        document.body.classList.remove('modal-open');\n        var backdrop = document.querySelector('.modal-backdrop');\n        if (backdrop && backdrop.parentElement)\n            backdrop.parentElement.removeChild(backdrop);\n    };\n    return Modal;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?\n}");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nvar Book = (function () {\n    function Book(params) {\n        var _a, _b, _c, _d, _e;\n        this.id = (_c = (_a = params.id) !== null && _a !== void 0 ? _a : (_b = crypto.randomUUID) === null || _b === void 0 ? void 0 : _b.call(crypto)) !== null && _c !== void 0 ? _c : String(Date.now());\n        this.title = params.title;\n        this.author = params.author;\n        this.year = params.year;\n        this.borrowedByUserId = (_d = params.borrowedByUserId) !== null && _d !== void 0 ? _d : null;\n        this.borrowedAt = (_e = params.borrowedAt) !== null && _e !== void 0 ? _e : null;\n    }\n    return Book;\n}());\n\nvar User = (function () {\n    function User(params) {\n        var _a, _b, _c;\n        this.id = (_c = (_a = params.id) !== null && _a !== void 0 ? _a : (_b = crypto.randomUUID) === null || _b === void 0 ? void 0 : _b.call(crypto)) !== null && _c !== void 0 ? _c : String(Date.now());\n        this.name = params.name;\n        this.email = params.email;\n    }\n    return User;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?\n}");

/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n\n\nvar LibraryService = (function () {\n    function LibraryService() {\n        this.storageKey = 'lab-app-books';\n        this.usersKey = 'lab-app-users';\n        this.loansKey = 'lab-app-loans';\n    }\n    LibraryService.prototype.seedIfEmpty = function () {\n        if (this.getAll().length === 0) {\n            var demo = [\n                new _models__WEBPACK_IMPORTED_MODULE_0__.Book({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 }),\n                new _models__WEBPACK_IMPORTED_MODULE_0__.Book({ title: 'Clean Code', author: 'Роберт Мартін', year: 2008 }),\n                new _models__WEBPACK_IMPORTED_MODULE_0__.Book({ title: 'The Pragmatic Programmer', author: 'Ендрю Генсон, Девід Томас', year: 1999 }),\n            ];\n            _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, demo);\n        }\n        if (this.getAllUsers().length === 0) {\n            var demoUsers = [\n                new _models__WEBPACK_IMPORTED_MODULE_0__.User({ name: 'Артем', email: 'artemkarachevtsev@gmail.com' }),\n                new _models__WEBPACK_IMPORTED_MODULE_0__.User({ name: 'Мартін', email: 'softwar@gmail.com' }),\n            ];\n            _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.usersKey, demoUsers);\n        }\n    };\n    LibraryService.prototype.getAll = function () {\n        return _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.getItem(this.storageKey, []);\n    };\n    LibraryService.prototype.add = function (book) {\n        var all = this.getAll();\n        all.push(book);\n        _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, all);\n    };\n    LibraryService.prototype.update = function (book) {\n        var all = this.getAll();\n        var idx = all.findIndex(function (b) { return b.id === book.id; });\n        if (idx !== -1) {\n            all[idx] = book;\n            _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, all);\n        }\n    };\n    LibraryService.prototype.remove = function (bookId) {\n        var all = this.getAll().filter(function (b) { return b.id !== bookId; });\n        _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, all);\n    };\n    LibraryService.prototype.getAllUsers = function () {\n        return _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.getItem(this.usersKey, []);\n    };\n    LibraryService.prototype.addUser = function (user) {\n        var all = this.getAllUsers();\n        all.push(user);\n        _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.usersKey, all);\n    };\n    LibraryService.prototype.borrowBook = function (bookId, userId) {\n        var all = this.getAll();\n        var book = all.find(function (b) { return b.id === bookId; });\n        if (!book)\n            return null;\n        if (book.borrowedByUserId)\n            return null;\n        book.borrowedByUserId = userId;\n        book.borrowedAt = new Date().toISOString();\n        _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, all);\n        return book;\n    };\n    LibraryService.prototype.returnBook = function (bookId) {\n        var all = this.getAll();\n        var book = all.find(function (b) { return b.id === bookId; });\n        if (!book)\n            return null;\n        book.borrowedByUserId = null;\n        book.borrowedAt = null;\n        _storage__WEBPACK_IMPORTED_MODULE_1__.Storage.setItem(this.storageKey, all);\n        return book;\n    };\n    return LibraryService;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?\n}");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Storage: () => (/* binding */ Storage)\n/* harmony export */ });\nvar Storage = (function () {\n    function Storage() {\n    }\n    Storage.getItem = function (key, fallback) {\n        try {\n            var raw = localStorage.getItem(key);\n            if (!raw)\n                return fallback;\n            return JSON.parse(raw);\n        }\n        catch (_a) {\n            return fallback;\n        }\n    };\n    Storage.setItem = function (key, value) {\n        localStorage.setItem(key, JSON.stringify(value));\n    };\n    Storage.removeItem = function (key) {\n        localStorage.removeItem(key);\n    };\n    Storage.clear = function (prefix) {\n        if (!prefix) {\n            localStorage.clear();\n            return;\n        }\n        var keys = [];\n        for (var i = 0; i < localStorage.length; i++) {\n            var k = localStorage.key(i);\n            if (k && k.startsWith(prefix))\n                keys.push(k);\n        }\n        keys.forEach(function (k) { return localStorage.removeItem(k); });\n    };\n    return Storage;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/storage.ts?\n}");

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