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

const messages = [
    {
        text: 'Пусть все серое, плохое\n Старый год возьмет \n с собою.\n Впредь лишь светлые\n мгновенья\n Создают пусть настроенье!',
        template: '5',
        fontStyle: '1',
        color: '1',
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
        color: '2',
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
        color: '1',
        isMy: true
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

let newMessage = [];
let elWall, // Переменная для блока стены с сообщениями
    arrWallItems, // Переменная для массива сообщений
    countElements, // Переменная для количества элементов
    defaultWidth = 400,
    defaultHeight = 410,
    isDragging = false, // Переменная показывает идет ли перетаскивание
    coordLeft,
    coordTop,
    elMain, // Переменная для всего main
    elBtnMessage; // Переменная для перехода к своему сообщению

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

    // Узнаем количество элементов в одном ряду и добавляем 2 для смещения
    if(window.screen.width >= 768) {
        countElements = Math.trunc(document.documentElement.scrollWidth / defaultWidth) + 2;
    }
    else {
        countElements = 6;
    }

    // Узнаем количество линий и добавляем одну
    let lines = Math.trunc(messages.length / countElements) + 1;

    // Заполнение нового массива newMessage
    for(let i=0; i<lines; i++) {
        let arr = [];
        newMessage.push(arr);
        for(let j = 0 + countElements * i; j < countElements * (i+1); j++){
            if(messages[j]){
                newMessage[i][j] = messages[j];
            }
        }
    }

    for(let i=0; i<newMessage.length; i++){
        // Создаем линии, их кол-во равно кол-ву массивов в newMessage
        let elLine = document.createElement('div');
        elLine.dataset.line = i.toString();

        elWall.append(elLine); // Линии добавляем на стену

        // Заполняем линии элементами исполбзуя массив newMessage
        for (let j=0 + countElements * i; j < countElements * (i+1); j++) {
            if(typeof(newMessage[i][j]) !== 'undefined') {
                let elItem;
                elItem = document.createElement('div');
                elItem.classList.add('wall__item');
                elItem.classList.add(`template-${newMessage[i][j].template}`);
                elItem.classList.add(`color-${newMessage[i][j].color}`);
                if(newMessage[i][j].isMy) {
                    elItem.dataset.my = newMessage[i][j].isMy;
                }
                const elPre = document.createElement('pre');
                elPre.textContent = `${newMessage[i][j].text}`;
                elPre.classList.add(`font-style-${newMessage[i][j].fontStyle}`);
                elItem.append(elPre);

                if(parseInt(elLine.dataset.line, 10) === i) {
                    elLine.append(elItem);
                }
            }
        }
    }

    arrWallItems = getArrayElements('.wall__item');

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

        console.log(parseInt(elWall.dataset.top, 10) + (Math.round(pageY) - elWall.dataset.coordy), document.body.offsetHeight/2);
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
                console.log(item.parentElement.dataset.line, Array.from(item.parentElement.childNodes).indexOf(item));
            }
        })
    })


}




