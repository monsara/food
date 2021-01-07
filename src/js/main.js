'use strict';

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
});
