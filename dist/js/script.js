/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const refs = {
    tabs: document.querySelectorAll('.tabheader__item'),
    tabsContent: document.querySelectorAll('.tabcontent'),
    tabsParent: document.querySelector('.tabheader__items')
  };
  refs.tabsParent.addEventListener('click', handleTabsParentClick);
  hideTabContent();
  showTabContent();
  /* ---------------------------- Functions ------------------------------- */

  function handleTabsParentClick(event) {
    const target = event.target;

    if (target && target.matches('.tabheader__item')) {
      refs.tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }

    setActiveLink(target);
  }

  function hideTabContent() {
    refs.tabsContent.forEach(tabContent => {
      tabContent.classList.add('hide');
      tabContent.classList.remove('show', 'fade');
    });
  }

  function showTabContent(i = 0) {
    refs.tabsContent[i].classList.add('show', 'fade');
    refs.tabsContent[i].classList.remove('hide');
  }

  function setActiveLink(currentLink) {
    const activeLink = currentLink.parentNode.querySelector('.tabheader__item_active');

    if (activeLink) {
      activeLink.classList.remove('tabheader__item_active');
    }

    currentLink.classList.add('tabheader__item_active');
  } // Timer


  const daysToFinish = 3;
  let deadline; // let deadline = '2021.05.11';

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  deadline = new Date(year, month, day);
  deadline.setDate(deadline.getDate() + daysToFinish);
  setClock('.timer', deadline);
  /* ---------------------------- Functions ------------------------------- */

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const seconds = Math.floor(t / 1000 % 60);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function formatDate(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = formatDate(t.days);
      hours.innerHTML = formatDate(t.hours);
      minutes.innerHTML = formatDate(t.minutes);
      seconds.innerHTML = formatDate(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  } // Modal


  const modalTriger = document.querySelectorAll('[data-action="open-modal"]');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('[data-action="close-modal"]');
  const modalTimerId = setTimeout(openModal, 3000);
  modalTriger.forEach(triger => {
    triger.addEventListener('click', openModal);
  });
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target !== modal) {
      return;
    }

    closeModal();
  });
  window.addEventListener('scroll', openModalByScroll);
  /* ---------------------------- Functions ------------------------------- */

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyEscapePress);
    clearTimeout(modalTimerId);
  }

  function openModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      openModal();
      removeEventListener('scroll', openModalByScroll);
    }
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyEscapePress);
  }

  function handleKeyEscapePress(event) {
    if (event.code !== 'Escape') {
      return;
    }

    closeModal();
  } // Usage classes for cards


  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changToUAH();
    }

    changToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>
                        грн/день
                    </div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', `Меню "Фитнес" - это новый
        подход к приготовлению блюд: больше свежих овощей и
        фруктов. Продукт активных и здоровых людей. Это
        абсолютно новый продукт с оптимальной ценой и
        высоким
        качеством!`, 9, '.menu .container', 'menu__item').render();
  new MenuCard('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', `В меню “Премиум” мы
        используем
        не только красивый дизайн упаковки, но и
        качественное
        исполнение блюд. Красная рыба, морепродукты, фрукты
        -
        ресторанное меню без похода в ресторан!`, 17, '.menu .container', 'menu__item').render();
  new MenuCard('img/tabs/post.jpg', 'elite', 'Меню “Пjcnyjt”', `Меню “Постное” - это
        тщательный подбор ингредиентов: полное отсутствие
        продуктов животного происхождения, молоко из
        миндаля,
        овса, кокоса или гречки, правильное количество
        белков за
        счет тофу и импортных вегетарианских стейков.`, 15, '.menu .container', 'menu__item').render();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map