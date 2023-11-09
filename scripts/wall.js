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
    arrWallItems, // Переменная для массива сообщений
    countElements, // Переменная для количества элементов
    defaultWidth = 300,
    defaultHeight = 310,
    isDragging = false, // Переменная показывает идет ли перетаскивание
    coordLeft,
    coordTop,
    elMain, // Переменная для всего main
    elBtnMessage, // Переменная для перехода к своему сообщению
    rightLine = [], // Массив для центральных элементов справа от 0
    rightLineTop = []; // Массив для центральных элементов справа от 0 и всех которые вверх над ними

if(window.screen.width < 768) {
    defaultWidth = 222;
    defaultHeight = 232;
}

window.onload = () => {
    // Устанавливаем высоту body
    document.body.style.height = `${document.documentElement.scrollHeight}px`;
    elWall = getElement('.js-wall');
    elMain = getElement('.js-main');
    elBtnMessage = getElement('.js-btn-message');

    let messages = [];

    let startLeft =  (window.screen.width - defaultWidth)/2;
    let startTop =  (window.screen.height - defaultHeight)/2;

    fetch("https://kinder-api.brainrus.ru/list")
        .then((response) => response.json())
        .then((result) => {
            messages = result;
            for(let i=0; i<messages.length; i++) {
                let elItem;
                elItem = document.createElement('div');
                elItem.classList.add('wall__item');
                elItem.classList.add(`template-${messages[i].template}`);
                elItem.classList.add(`color-${messages[i].color}`);
                elItem.dataset.num = messages[i].id - 1;
                if (messages[i].isMy) {
                    elItem.dataset.my = messages[i].isMy;
                }
                const elPre = document.createElement('pre');
                elPre.textContent = `${messages[i].text}`;
                elPre.classList.add(`font-style-${messages[i].font_style}`);
                elItem.append(elPre);
                elWall.append(elItem);
            }

            arrWallItems = getArrayElements('.wall__item');
            arrWallItemsNew = getArrayElements('.wall__item');

            // Coordinates
            let arrLinefrom4 = [],
                arrLinefrom8 = [];
            let start4 = 4,
                start8 = 8;

            // 1й в центре
            arrWallItemsNew[0].style.left = `${startLeft}px`;
            arrWallItemsNew[0].style.top = `${startTop}px`;

            // 2й
            arrWallItemsNew[1].style.left = `${startLeft + defaultWidth}px`;
            arrWallItemsNew[1].style.top = `${startTop}px`;

            // 3й
            arrWallItemsNew[2].style.left = `${startLeft + defaultWidth/2}px`;
            arrWallItemsNew[2].style.top = `${startTop + defaultHeight}px`;

            //4й
            arrWallItemsNew[3].style.left = `${startLeft - defaultWidth/2}px`;
            arrWallItemsNew[3].style.top = `${startTop + defaultHeight}px`;

            //5й
            arrWallItemsNew[4].style.left = `${startLeft - defaultWidth}px`;
            arrWallItemsNew[4].style.top = `${startTop}px`;

            //6й
            arrWallItemsNew[5].style.left = `${startLeft - defaultWidth/2}px`;
            arrWallItemsNew[5].style.top = `${startTop - defaultHeight}px`;

            //7й
            arrWallItemsNew[6].style.left = `${startLeft + defaultWidth/2}px`;
            arrWallItemsNew[6].style.top = `${startTop - defaultHeight}px`;

            //8й
            arrWallItemsNew[7].style.left = `${startLeft + 2 * defaultWidth}px`;
            arrWallItemsNew[7].style.top = `${startTop}px`;

            // от 4го элемента и влево
            for(let i = 2; i< arrWallItemsNew.length; i++){
                start4 = (start4 + (6 * i) - 2);
                arrLinefrom4.push(start4);
            }
            for (let i =0; i < arrLinefrom4.length; i++){
                if(arrWallItemsNew[arrLinefrom4[i]]){
                    arrWallItemsNew[arrLinefrom4[i]].style.left = `${startLeft - defaultWidth * (i + 2)}px`;
                    arrWallItemsNew[arrLinefrom4[i]].style.top = `${startTop}px`;
                }
            }

            // от 8го элемента и вправо
            for(let i = 2; i< arrWallItemsNew.length; i++){
                start8 = (start8 + (6 * i) + 1);
                arrLinefrom8.push(start8);
            }
            for (let i =0; i < arrLinefrom8.length; i++){
                if(arrWallItemsNew[arrLinefrom8[i]]){
                    arrWallItemsNew[arrLinefrom8[i]].style.left = `${startLeft + defaultWidth * (i + 3)}px`;
                    arrWallItemsNew[arrLinefrom8[i]].style.top = `${startTop}px`;
                }
            }

            rightLine = [0, 1, 8, ...arrLinefrom8];

            //
            for(let i=0; i<rightLine.length; i++) {
                let start = rightLine[i];
                for(let j=0; j<rightLine.length; j++) {
                    start = start + 6*j;
                    rightLineTop.push(start);
                }
            }

            console.log(rightLine);

            elWall.style.width = `${defaultWidth * countElements}px`;
            elWall.style.left = `${(document.body.offsetWidth - elWall.offsetWidth)/2}px`;

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

            elWall.addEventListener('pointerdown', (e) => {
                elWall.dataset.coordx = Math.round(e.clientX);
                elWall.dataset.coordy = Math.round(e.clientY);
                isDragging = true;
            })

            function setCoords (pageX, pageY) {
                if(parseInt(elWall.dataset.left, 10) + (Math.round(pageX) - elWall.dataset.coordx) > elMain.offsetWidth/2) {
                    coordLeft = elMain.offsetWidth/2; // Половина видимой части
                }
                else if(elWall.offsetWidth + (parseInt(elWall.dataset.left, 10) + (Math.round(pageX) - elWall.dataset.coordx)) <= elMain.offsetWidth/2) {
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
            })

            elWall.ondragstart = function() {
                return false;
            };

            elBtnMessage.addEventListener('click', () => {
                arrWallItems.forEach((item) => {
                    if(item.dataset.my) {
                        elWall.style.left = `${-1*Array.from(item.parentElement.childNodes).indexOf(item) * defaultWidth}px`;
                        elWall.style.top = `${-1*item.parentElement.dataset.line * defaultHeight}px`;
                    }
                })
            })
        })
        .catch((e) => {
            console.log(e);
        });

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 2500)
}




