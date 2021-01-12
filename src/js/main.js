'use strict';

const { data } = require('autoprefixer');

window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const refs = {
        tabs: document.querySelectorAll('.tabheader__item'),
        tabsContent: document.querySelectorAll('.tabcontent'),
        tabsParent: document.querySelector('.tabheader__items'),
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
        const activeLink = currentLink.parentNode.querySelector(
            '.tabheader__item_active',
        );

        if (activeLink) {
            activeLink.classList.remove('tabheader__item_active');
        }

        currentLink.classList.add('tabheader__item_active');
    }

    // Timer
    const daysToFinish = 3;
    let deadline;
    // let deadline = '2021.05.11';

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
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
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
    }

    // Modal
    const modalTriger = document.querySelectorAll('[data-action="open-modal"]');
    const modal = document.querySelector('.modal');
    const modalTimerId = setTimeout(openModal, 50000);

    modalTriger.forEach(triger => {
        triger.addEventListener('click', openModal);
    });

    modal.addEventListener('click', event => {
        if (
            !(
                event.target === modal ||
                event.target.matches('[data-action="close-modal"]')
            )
        ) {
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
        if (
            window.pageYOffset + document.documentElement.clientHeight ===
            document.documentElement.scrollHeight
        ) {
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
    }

    // Usage classes for cards
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
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
                this.classes.forEach(className =>
                    element.classList.add(className),
                );
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

    async function getResource(url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    // v.1: with fetch API
    // getResource('http://localhost:3000/menu').then(data => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             '.menu .container',
    //         ).render();
    //     });
    // });

    // v.2: with fetch Axios
    axios.get('http://localhost:3000/menu').then(data => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                '.menu .container',
            ).render();
        });
    });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

    // Forms

    const forms = document.forms;

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    };

    Array.from(forms).forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            // TODO: Write function renderStatusMessage for code below
            let statusMessage = document.createElement('img');
            statusMessage.classList.add('loading');
            statusMessage.src = message.loading;
            statusMessage.alt = 'Loading spinner';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};

            formData.forEach((key, value) => {
                object[key] = value;
            });

            // const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                });
            // .finally(() => {
            //     form.reset();
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();

        // TODO: Write function renderThanksModal for code below
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-action="close-modal">×</div>
                <div class"modal__title">${message}</div>
            </div>
        `;
        prevModalDialog.closest('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});
