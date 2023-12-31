function getElement(selector, parent = document) {
    const elem = parent.querySelector(selector);
    if (!elem) {
        return null;
    }
    else {
        return elem;
    }
}

function getArrayElements(selector, parent = document) {
    const array = Array.from(parent.querySelectorAll(selector));
    if (!array) {
        return [];
    }

    return array;
}

let elWall, // Переменная для блока стены с сообщениями
    elWallTop, // Переменная для блока, где есть элементы сверха от центра
    elWallCenter, // Переменная для блока, где есть элементы центра
    elWallBottom, // Переменная для блока, где есть элементы снизу от центра
    arrWallItems, // Переменная для массива сообщений
    defaultWidth = 400,
    defaultHeight = 410,
    isDragging = false, // Переменная показывает идет ли перетаскивание
    coordLeft,
    coordTop,
    elMain, // Переменная для всего main
    elBtnMessage, // Переменная для перехода к своему сообщению
    elBtnBack, // Переменная для кнопки назад
    elButtons, // Переменная для блока кнопок вверху
    elLoader, // Переменная для прелоадера
    elBtnGift, // Переменная для кнопки подарок
    elFinger, // Переменная для элемента палец
    elFlight, // Переменная для блока со снегирем
    elEnd,
    elClose,
    messageObj ={
        template: '',
        color: '',
        font_style: '',
        text: ''
    };

if(window.screen.width < 768) {
    defaultWidth = 222;
    defaultHeight = 232;
}

// Функция обработки нажатия кнопки назад
function goBack() {
    elBtnBack.addEventListener('click', () => {
        window.location.href ="index.html";
    })
}

// Функция обработки нажатия кнопки с подаррком
function clickGift () {
    elBtnGift.addEventListener('click', () => {
        const audioBird1 = document.querySelector("#audio-bird1");
        if(audioBird1) {
            audioBird1.play();
        }
        elMain.classList.add('is-final-stage');
        elWall.classList.add('is-hidden');
        elButtons.classList.add('is-hidden');
        elBtnMessage.classList.add('is-hidden');
        elBtnGift.classList.add('is-hidden');
        elFinger.classList.add('is-hidden');
        elFlight.classList.remove('is-hidden');
        showEnd();
    })
}

// Функция показа последнего состояния
function showEnd() {
    setTimeout(() => {
        if(!elFlight.classList.contains('is-hidden')){
            elFlight.classList.add('is-hidden');
            elEnd.classList.remove('is-hidden');
        }
    }, 5000)
}

// Функция обработки нажатия крестика
function clickClose() {
    elClose.addEventListener('click', () => {
        elEnd.classList.add('is-hidden');
        elWall.classList.remove('is-hidden');
        elButtons.classList.remove('is-hidden');
        elBtnGift.classList.remove('is-hidden');
        elFinger.classList.remove('is-hidden');
        elBtnMessage.classList.remove('is-hidden');
    })
}

// const preloader = document.querySelector(".preloader");

const resize = () => {
    if(window.screen.width < 768) {
        const { clientWidth, clientHeight } = document.documentElement;
        const orientation = document.getElementById("orientation");

        if (clientWidth > clientHeight) {
            orientation.style.display = "flex";
        } else {
            orientation.style.display = "none";
        }

        /*if (preloader) {
            preloader.style.height = window.innerHeight + "px";
        }*/
    }

};


window.onload = () => {
    // Устанавливаем высоту body
    document.body.style.height = `${document.documentElement.scrollHeight}px`;
    elWall = getElement('.js-wall');
    elWallTop = getElement('.js-wall-top');
    elWallCenter = getElement('.js-wall-center');
    elWallBottom = getElement('.js-wall-bottom');
    elMain = getElement('.js-main');
    elBtnMessage = getElement('.js-btn-message');
    elBtnBack = getElement('.js-btn-back');
    elButtons = getElement('.js-buttons');
    elLoader = getElement('.js-loader');
    elBtnGift = getElement('.js-btn-gift');
    elFinger = getElement('.js-finger');
    elFlight = getElement('.js-flight');
    elEnd = getElement('.js-end');
    elClose = getElement('.js-close');

    let fromStorage;// Для данных из стораж

    try {
        fromStorage = JSON.parse(window.localStorage.messages); // Получаем и сохраняем данные из стораж
        messageObj.template = fromStorage[fromStorage.length - 1].template;
        messageObj.color =  fromStorage[fromStorage.length - 1].color;
        messageObj.font_style = fromStorage[fromStorage.length - 1].font_style;
        messageObj.text = fromStorage[fromStorage.length - 1].text;
    } catch (e) {}

    let messages = [],
        centralLineIndex = []; // Массив для индексов элементов в центральной линии шестиугольника

    fetch("https://kinder-api.brainrus.ru/list")
        .then((response) => response.json())
        .then((result) => {

            elLoader.classList.add('is-hidden');

            let halfCountItemsFromResult,
                countLines,
                resultTop = [],
                resultBottom = [];

            messages = result;

            // Данные из стораж добавляем в message, но только те данные uuid которых нет в message
            let matches = 0; // Количество совпадений uuid
            if(fromStorage) {
                fromStorage.forEach((item) => {
                    for(let i=0; i<messages.length; i++) {
                        if(item.uuid === messages[i].uuid) {
                            matches += 1;
                        }
                    }
                    if(matches ===0) { // Если нет совпадений uuid , то данные из стораж добавляем в message
                        messages.push(item);
                    }
                })
            }


            // Для центральной линии
            let arrLineFrom4 = [],
                arrLineFrom8 = [];
            let start4 = 4,
                start8 = 8;

            // Индексы от 4го элемента и ВЛЕВО НЕ ВКЛЮЧАЯ 4й
            for(let i = 2; i< messages.length; i++){
                start4 = (start4 + (6 * i) - 2);
                if(messages[start4]) {
                    arrLineFrom4.push(start4);
                }
            }

            // от 8го элемента и ВПРАВО НЕ ВКЛЮЧАЯ 8й
            for(let i = 2; i< messages.length; i++){
                start8 = (start8 + (6 * i) + 1);
                if(messages[start8]) {
                    arrLineFrom8.push(start8);
                }
            }

            const startIndex = [4, 0, 1, 8]; // Индексы центральных элементов
            const arrLineForm4To8 = []

            for(let item of startIndex) {
                if(messages[item]){
                    arrLineForm4To8.push(item);
                }
            }

            centralLineIndex = [...arrLineFrom4.reverse(), ...arrLineForm4To8, ...arrLineFrom8];
            if((messages.length - centralLineIndex.length) % 2 === 0) {
                halfCountItemsFromResult = (messages.length - centralLineIndex.length) / 2;
            }
            else {
                halfCountItemsFromResult = Math.trunc((messages.length - centralLineIndex.length) / 2) + 1;
            }

            // Количество строк на центральной линией и под ней
            countLines = centralLineIndex.length;

            messages.forEach((item) => {
                // Элемент у которого uuid совпадаем с тем который лежит в localStorage ставим на центральное место,
                // а на место ставим центральный
                if(fromStorage && item.uuid === fromStorage[fromStorage.length - 1].uuid) {
                    let temp = messages[Math.trunc(centralLineIndex.length/2)];
                    let index = messages.indexOf(item);
                    messages[Math.trunc(centralLineIndex.length/2)] = item;
                    messages[index] = temp;
                }
            })

            // Заполняем среднюю линию
            for(let i=0; i<centralLineIndex.length; i++) {
                if(messages[i]){
                    const elDiv = document.createElement('div');
                    elDiv.classList.add('wall__item');
                    elDiv.classList.add(`template-${messages[i].template}`);
                    elDiv.classList.add(`color-${messages[i].color}`);
                    if(messages[i].uuid) {
                        elDiv.dataset.uuid = messages[i].uuid;
                    }
                    else {
                        elDiv.dataset.uuid = window.localStorage.getItem('uuid');
                    }
                    if (messages[i].uuid === window.localStorage.getItem('uuid')) {
                        elDiv.dataset.my = 'isMy';
                    }
                    const elPreWrap = document.createElement('div');
                    elPreWrap.classList.add('pre-wrap');
                    const elPre = document.createElement('pre');
                    elPre.innerHTML = `${messages[i].text}`;
                    elPre.classList.add(`font-style-${messages[i].font_style}`);
                    elPreWrap.append(elPre);
                    elDiv.append(elPreWrap);
                    elWallCenter.append(elDiv);
                }
            }

            let arrTop = [];
            // Берем элементы не с первого. Первые взяты в центральную линию.
            for(let i = centralLineIndex.length; i < (halfCountItemsFromResult + centralLineIndex.length); i++) {
                arrTop.push(messages[i]);
            }

            let arrBottom = [];
            // Берем элементы не с первого. Первые взяты в центральную линию.
            for(let i = centralLineIndex.length + halfCountItemsFromResult; i < messages.length; i++) {
                arrBottom.push(messages[i]);
            }

            // Заполнение нового массива resultTop
            for(let i = 0; i<(countLines-1); i++) {
                let arr = [];
                resultTop.push(arr);
                for(let j = 0 + (countLines-1) * i; j < (countLines - 1) * (i + 1) - i; j++){
                    if(arrTop[j]) {
                        resultTop[i][j] = arrTop[j];
                    }
                }
            }

            // Заполнение нового массива resultBottom
            for(let i = 0; i<(countLines-1); i++) {
                let arr = [];
                resultBottom.push(arr);
                for(let j = 0 + (countLines-1) * i; j < (countLines - 1) * (i + 1) - i; j++){
                    if(arrBottom[j]) {
                        resultBottom[i][j] = arrBottom[j];
                    }
                }
            }

            // Заполняем линии элементами исполбзуя массив resultTop
            for(let i=0; i<resultTop.length; i++) {
                let elLine = document.createElement('div');
                elLine.dataset.line = i.toString();
                if(resultTop[i].length !== 0) {
                    elWallTop.append(elLine); // Линии добавляем на стену
                }

                // Заполняем линии элементами исполбзуя массив newMessage
                for (let j = 0 + (countLines-1) * i; j < (countLines - 1) * (i + 1); j++) {
                    if (typeof(resultTop[i][j]) !== 'undefined') {
                        let elItem;
                        elItem = document.createElement('div');
                        elItem.classList.add('wall__item');
                        elItem.classList.add(`template-${resultTop[i][j].template}`);
                        elItem.classList.add(`color-${resultTop[i][j].color}`);
                        if(resultTop[i][j].uuid) {
                            elItem.dataset.uuid = resultTop[i][j].uuid;
                        }
                        else {
                            elDiv.dataset.uuid = window.localStorage.getItem('uuid');
                        }
                        if (resultTop[i][j].uuid === window.localStorage.getItem('uuid')) {
                            elItem.dataset.my = 'isMy';
                        }
                        const elPreWrap = document.createElement('div');
                        elPreWrap.classList.add('pre-wrap');
                        const elPre = document.createElement('pre');
                        elPre.innerHTML = `${resultTop[i][j].text}`;
                        elPre.classList.add(`font-style-${resultTop[i][j].font_style}`);
                        elPreWrap.append(elPre);
                        elItem.append(elPreWrap);

                        if (parseInt(elLine.dataset.line, 10) === i) {
                            elLine.append(elItem);
                        }
                    }
                }
            }

            // Заполняем линии элементами исполбзуя массив resultBottom
            for(let i=0; i<resultBottom.length; i++) {
                let elLine = document.createElement('div');
                elLine.dataset.line = i.toString();
                if(resultBottom[i].length !== 0) {
                    elWallBottom.append(elLine); // Линии добавляем на стену
                }

                // Заполняем линии элементами исполбзуя массив resultBottom
                for (let j = 0 + (countLines-1) * i; j < (countLines - 1) * (i + 1); j++) {
                    if (typeof (resultBottom[i][j]) !== 'undefined') {
                        let elItem;
                        elItem = document.createElement('div');
                        elItem.classList.add('wall__item');
                        elItem.classList.add(`template-${resultBottom[i][j].template}`);
                        elItem.classList.add(`color-${resultBottom[i][j].color}`);
                        if(resultTop[i][j].uuid) {
                            elItem.dataset.uuid = resultTop[i][j].uuid;
                        }
                        else {
                            elDiv.dataset.uuid = window.localStorage.getItem('uuid');
                        }
                        if (resultTop[i][j].uuid === window.localStorage.getItem('uuid')) {
                            elItem.dataset.my = 'isMy';
                        }
                        const elPreWrap = document.createElement('div');
                        elPreWrap.classList.add('pre-wrap');
                        const elPre = document.createElement('pre');
                        elPre.innerHTML = `${resultBottom[i][j].text}`;
                        elPre.classList.add(`font-style-${resultBottom[i][j].font_style}`);
                        elPreWrap.append(elPre);
                        elItem.append(elPreWrap);

                        if (parseInt(elLine.dataset.line, 10) === i) {
                            elLine.append(elItem);
                        }
                    }
                }
            }

            arrWallItems = getArrayElements('.wall__item');

            let items = arrWallItems;

            let h = window.innerHeight;
            let w = window.innerWidth;

            let c = items[Math.round(items.length/2)];
            let cr = c.getBoundingClientRect();
            window.scroll(cr.left - (w / 2)+ (cr.width / 2),
                cr.top - (h / 2) + (cr.height / 2));

            requestAnimationFrame(onScroll);

            function onScroll(){
                let pos = null, s = 0, s2 = 0;

                for (let i=0; i <items.length;++i) {

                    pos = items[i].getBoundingClientRect();

                    s = (pos.top + (pos.height / 2) - (h / 2)) / h;
                    s = 1 - Math.abs(s);
                    s = (s < 0 ? 0 : (s > 1 ? 1 : s));

                    s2 = (pos.left + (pos.width / 2) - (w / 2)) / w;
                    s2 = 1 - Math.abs(s2);
                    s2 = (s2 < 0 ? 0 : (s2 > 1 ? 1 : s2));

                    s = (s + s2) / 2;

                    items[i].style.transform = "scale("+s+")";
                }

                requestAnimationFrame(onScroll);

            }

            window.scrollTo(0, 0);

            elWall.addEventListener('pointerdown', (e) => {
                elWall.dataset.coordx = Math.round(e.clientX);
                elWall.dataset.coordy = Math.round(e.clientY);
                elWall.classList.add('dragging');
                isDragging = true;
            })

            function setCoords (pageX, pageY) {
                if(parseInt(elWall.dataset.left, 10) + (Math.round(pageX) - elWall.dataset.coordx) >= document.body.offsetWidth/2) {
                    coordLeft = document.body.offsetWidth/2; // Половина видимой части
                }
                else if(elWall.offsetWidth + (parseInt(elWall.dataset.left, 10) + (Math.round(pageX) - elWall.dataset.coordx)) < document.body.offsetWidth/2) {
                    // Половина стены + половина невидимой части стены и инверсия при помощи -1
                    coordLeft = -1*((elWall.offsetWidth - elMain.offsetWidth)/2 + elWall.offsetWidth/2);
                }
                else {
                    coordLeft = parseInt(elWall.dataset.left, 10) + (Math.round(pageX) - elWall.dataset.coordx);
                }

                if(parseInt(elWall.dataset.top, 10) + (Math.round(pageY) - elWall.dataset.coordy) > document.body.offsetHeight/2) {
                    coordTop = document.body.offsetHeight/2; // Половина видимой части
                }
                else if(parseInt(elWall.dataset.top, 10) + (Math.round(pageY) - elWall.dataset.coordy) <= -elWall.offsetHeight + document.body.offsetHeight/2) {
                    // Половина стены + половина невидимой части стены и инверсия при помощи -1
                    coordTop = -elWall.offsetHeight + document.body.offsetHeight/2;
                }
                else {
                    coordTop = parseInt(elWall.dataset.top, 10) + (Math.round(pageY) - elWall.dataset.coordy);
                }
                elWall.style.left = coordLeft + 'px';
                elWall.style.top = coordTop + 'px';
            }

            elWall.addEventListener('pointermove', (e) => {
                if (isDragging) {
                    setCoords(e.clientX, e.clientY);
                }
            });

            elWall.addEventListener('pointerup', (e) => {
                isDragging = false;
                e.currentTarget.removeEventListener('pointermove', setCoords);
                e.currentTarget.pointermove = null;
                elWall.dataset.left = coordLeft;
                elWall.dataset.top = coordTop;
                elWall.classList.remove('dragging');
            })

            elWall.addEventListener('pointerout', (e) => {
                if(!e.currentTarget.classList.contains('js-wall')) {
                    isDragging = false;
                    e.currentTarget.removeEventListener('pointermove', setCoords);
                    e.currentTarget.pointermove = null;
                    elWall.dataset.left = coordLeft;
                    elWall.dataset.top = coordTop;
                    elWall.classList.remove('dragging');
                }
            });

            elWall.ondragstart = function() {
                return false;
            };

            elWall.style.width = `${defaultWidth * centralLineIndex.length}px`;
            elWall.style.left = `${(document.body.offsetWidth - elWall.offsetWidth)/2}px`;
            elWall.style.top = `${(document.body.offsetHeight - elWall.offsetHeight)/2}px`;
            elWall.dataset.left = ((document.body.offsetWidth - elWall.offsetWidth)/2).toString();
            elWall.dataset.top = ((document.body.offsetHeight - elWall.offsetHeight)/2).toString();

            elBtnMessage.addEventListener('click', () => {
                elWall.style.width = `${defaultWidth * centralLineIndex.length}px`;
                elWall.style.left = `${(document.body.offsetWidth - elWall.offsetWidth)/2}px`;
                elWall.style.top = `${(document.body.offsetHeight - elWall.offsetHeight)/2}px`;
                elWall.dataset.left = ((document.body.offsetWidth - elWall.offsetWidth)/2).toString();
                elWall.dataset.top = ((document.body.offsetHeight - elWall.offsetHeight)/2).toString();

            })
        })
        .catch((e) => {
            console.log(e);
        });

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 2500);

    goBack();
    clickGift();
    clickClose();
}

window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);




