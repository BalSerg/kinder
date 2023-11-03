function getElement(selector, parent = document) {
    const elem = parent.querySelector(selector);
    if (!elem) {
        return null;
    }
    else {
        return elem;
    }
}

const messages = [
    {
        text: 'Пусть все серое, плохое\n Старый год возьмет \n с собою.\n Впредь лишь светлые\n мгновенья\n Создают пусть настроенье!',
        template: '5',
        fontStyle: '1',
        color: '1'
    },
    {
        text: 'Всем счастья!\n \n Желаю много радости \n в новом году, хорошей \n погоды, друзей \n и конфет!\n \n С новым годом!',
        template: '3',
        fontStyle: '2',
        color: '2'
    },
    {
        text: 'Двенадцать раз пробьют часы,\n И чудо вдруг случится!\n Пусть все исполнятся мечты,\n В дом радость постучится.',
        template: '1',
        fontStyle: '3',
        color: '1'
    },
    {
        text: 'Любви, добра и красоты,\n Успехов и подарков!\n И пусть счастливым будет\n год —Богатым, добрым,\n ярким!',
        template: '4',
        fontStyle: '2',
        color: '3'
    },
    {
        text: 'Улыбок, веселья,\n достатка, тепла,\n Не знать ни забот, \n ни напастей.',
        template: '2',
        fontStyle: '2',
        color: '3'
    },
    {
        text: 'С Новым годом! \n \n Волшебства, Смеха, \n счастья и тепла, Мира, \n радостей, достатка\n И во всех делах порядка!',
        template: '1',
        fontStyle: '1',
        color: '3'
    },
    {
        text: 'Самых ярких впечатлений,\n Самых сказочных мгновений.\n Пусть Вам этот год несет\n Много радостных хлопот!',
        template: '4',
        fontStyle: '3',
        color: '1'
    },
    {
        text: 'Желаю вам весь этот год\n Прожить в любви и счастье,\n Не знать печали и забот\n И прочие ненастья.',
        template: '3',
        fontStyle: '2',
        color: '1'
    },
    {
        text: 'Пусть исполнятся мечты\n И желания, и сны.\n Пусть сияют ваши глазки,\n Будет жизнь пускай, \n как в сказке!',
        template: '1',
        fontStyle: '1',
        color: '2'
    },
    {
        text: 'Пусть Новый год\n Побольше денег принесёт,\n Здоровья, мира и любви,\n Чтоб в сердце не было\n зимы!',
        template: '6',
        fontStyle: '2',
        color: '2'
    },
    {
        text: 'Желаю в этот Новый\n год Поменьше грусти \n и забот, Побольше \nсчастья, добра, Улыбок, \n нежности, тепла!',
        template: '2',
        fontStyle: '1',
        color: '3'
    },
    {
        text: 'Пусть все серое, плохое\n Старый год возьмет \n с собою.\n Впредь лишь светлые \n мгновенья\n Создают пусть настроенье!',
        template: '5',
        fontStyle: '3',
        color: '1'
    },
    {
        text: 'Всем счастья!\n \n Желаю много радости \n в новом году, хорошей \n погоды, друзей \n и конфет!\n \n С новым годом!',
        template: '3',
        fontStyle: '2',
        color: '2'
    },
    {
        text: 'Двенадцать раз пробьют часы,\n И чудо вдруг случится!\n Пусть все исполнятся мечты,\n В дом радость постучится.',
        template: '1',
        fontStyle: '3',
        color: '1'
    },
    {
        text: 'Любви, добра и красоты,\n Успехов и подарков!\n И пусть счастливым будет\n год —Богатым, добрым,\n ярким!',
        template: '4',
        fontStyle: '2',
        color: '3'
    },
    {
        text: 'Улыбок, веселья,\n достатка, тепла,\n Не знать ни забот, \n ни напастей.',
        template: '2',
        fontStyle: '2',
        color: '3'
    },
    {
        text: 'С Новым годом! \n \n Волшебства, Смеха, \n счастья и тепла, Мира, \n радостей, достатка\n И во всех делах порядка!',
        template: '1',
        fontStyle: '1',
        color: '3'
    },
    {
        text: 'Самых ярких впечатлений,\n Самых сказочных мгновений.\n Пусть Вам этот год несет\n Много радостных хлопот!',
        template: '4',
        fontStyle: '3',
        color: '1'
    },
    {
        text: 'Желаю вам весь этот год\n Прожить в любви и счастье,\n Не знать печали и забот\n И прочие ненастья.',
        template: '3',
        fontStyle: '2',
        color: '1'
    },
    {
        text: 'Пусть исполнятся мечты\n И желания, и сны.\n Пусть сияют ваши глазки,\n Будет жизнь пускай, \n как в сказке!',
        template: '1',
        fontStyle: '1',
        color: '2'
    },
    {
        text: 'Пусть Новый год\n Побольше денег принесёт,\n Здоровья, мира и любви,\n Чтоб в сердце не было\n зимы!',
        template: '6',
        fontStyle: '2',
        color: '2'
    },
    {
        text: 'Желаю в этот Новый\n год Поменьше грусти \n и забот, Побольше \nсчастья, добра, Улыбок, \n нежности, тепла!',
        template: '2',
        fontStyle: '1',
        color: '3'
    }
]

let elWall, // Переменная для блока стены с сообщениями
    arrWallItems, // Переменная для массива сообщений
    isCanCallSetWidthWallNoMiddle = true, // Переменная показыввающая может ли быть вызвана функция , отвечающая за установку ширины стены когда нет наведения и нет движения
    isCanCallSetWidthWallYesMiddle = true, // Переменная показыввающая может ли быть вызвана функция , отвечающая за установку ширины стены когда нет наведения и есть движение
    isCanCallSetWidthWallWhenHoverInMiddle = true, // Переменная показыввающая может ли быть вызвана функция setWidthWallYesHover, отвечающая за уатсновку ширины стены
    isCanCallSetWidthWallWhenHoverNoMiddle = true,
    countElements // Переменная для количества элементов

const defaultWidth = 300,
      defaultWidthSubHover = 336,
      defaultWidthHover = 390,
      middleLineWidth = 370,
      middleLineWithSubHover = 416,
      middleLineWithHover = 485,
      defaultMarginHor = 16,
      defaultMarginVer = 16;

// Функция устанваливает ширину контейнера с сообщениями стены, когда нет наведения на элемент И НЕТ движения
function setWidthWallNoHoverNoMiddle() {
    elWall.style.width = `${countElements * defaultWidth + countElements * defaultMarginHor *2}px`;
    return isCanCallSetWidthWallNoMiddle = false;
}

// Функция устанваливает ширину контейнера с сообщениями стены, когда нет наведения на элемент НО ЕСТЬ движение
function setWidthWallNoHoverYesMiddle() {
    elWall.style.width = `${countElements * middleLineWidth + countElements * defaultMarginHor *2}px`;
    return isCanCallSetWidthWallYesMiddle = false;
}

// Функция устанваливает ширину контейнера с сообщениями стены, когда ЕСТЬ наведение на элемент НО НЕ В СРЕДНЕЙ линии
function setWidthWallYesHoverNoMiddle() {
    elWall.style.width = `${
        defaultWidth * (countElements - 3) +
        defaultWidthHover * 1 +
        defaultWidthSubHover * 2 +
        countElements * defaultMarginHor *2
    }px`;
    return isCanCallSetWidthWallWhenHoverNoMiddle = false;
}

// Функция устанваливает ширину контейнера с сообщениями стены, когда ЕСТЬ наведение на элемент В СРЕДНЕЙ линии
function setWidthWallYesHoverYesMiddle() {
    elWall.style.width = `${
        middleLineWidth * (countElements - 3) +
        middleLineWithHover * 1 +
        middleLineWithSubHover * 2 +
        countElements * defaultMarginHor *2
    }px`;
    return isCanCallSetWidthWallWhenHoverInMiddle = false;
}

// Функция увеличивающая елементы в ряду, который пересекает середину`
function increaseItemsMiddleLine() {
    // Убираем у всех сообщений класс middle-line
    for(let i=0; i<arrWallItems.length; i++) {
        arrWallItems[i].classList.remove('middle-line');
        arrWallItems[i].classList.remove('hover');
        arrWallItems[i].classList.remove('subHover');
    }

    // Условие для того чтобы функция установки ширины стены вызывалась только раз при перетаскивании
    if(isCanCallSetWidthWallYesMiddle) {
        setWidthWallNoHoverYesMiddle();
    }

    //Добавляем к элементу класс middle-line если верхний край меньше середины, а нижний больше середины
    let arrMiddle =[];
    for(let i = 0; i < arrWallItems.length; i++) {
        if(arrWallItems[i].getBoundingClientRect().top < window.screen.height /2 && arrWallItems[i].getBoundingClientRect().bottom > window.screen.height/2) {
            arrMiddle.push(arrWallItems[i]);
            if(arrMiddle.length > countElements) {
                arrMiddle.pop();
            }
        }
    }
    if(arrMiddle.length >= countElements) {
        arrMiddle.forEach((item) => {
            item.classList.add('middle-line');
        })
    }
}

// Функция увеличения при наведении и увелчении соседних блоков
function increasePointerMove() {
    arrWallItems.forEach((item, index) => {
        item.addEventListener('pointerover', () => {
            for(let jtem of arrWallItems) {
                jtem.classList.remove('hover');
                jtem.classList.remove('subHover');
            }
            item.classList.add('hover');
            if(item.classList.contains('middle-line')){
                if(item.getBoundingClientRect().left > (middleLineWidth + defaultMarginHor *2)) {
                    item.previousElementSibling.classList.add('subHover');
                }
                if(elWall.offsetWidth - item.getBoundingClientRect().right >= (middleLineWidth + defaultMarginHor *2)) {
                    item.nextElementSibling.classList.add('subHover');
                }
                if(isCanCallSetWidthWallWhenHoverInMiddle) {
                    setWidthWallYesHoverYesMiddle();
                }
            }
            else {
                if(item.getBoundingClientRect().left > (defaultWidth + defaultMarginHor *2)) {
                    item.previousElementSibling.classList.add('subHover');
                }
                if(elWall.offsetWidth - item.getBoundingClientRect().right >= (defaultWidth + defaultMarginHor *2)) {
                    item.nextElementSibling.classList.add('subHover');
                }
                if(isCanCallSetWidthWallWhenHoverNoMiddle) {
                    setWidthWallYesHoverNoMiddle();
                }
            }
        })
    })
}

window.onload = () => {
    elWall = getElement('.js-wall');
    countElements = Math.trunc(document.documentElement.scrollWidth / defaultWidth) + 1; // 6
    arrWallItems = elWall.childNodes;
    for(let i=0; i<messages.length; i++) {
        const elDiv = document.createElement('div');
        elDiv.classList.add(`wall__item`);
        elDiv.classList.add(`template-${messages[i].template}`);
        elDiv.classList.add(`color-${messages[i].color}`);
        const elPre = document.createElement('pre');
        elPre.textContent = `${messages[i].text}`;
        elPre.classList.add(`font-style-${messages[i].fontStyle}`);
        elDiv.append(elPre);
        elWall.append(elDiv);
    }
    setWidthWallNoHoverNoMiddle();
    increasePointerMove();
}

window.onscroll = () => {
    increaseItemsMiddleLine();
}


