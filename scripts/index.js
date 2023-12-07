function getElement(selector, parent = document) {
  const elem = parent.querySelector(selector);
  if (!elem) {
    //throw new Error(`Element ${selector} not found`);
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

const forbiddenChars = [
  '@', '#', '№', '$', '%', '&', '~', '_', '`'
]
const badWords = [
  'хуй',
  'х уй',
  'ху й',
  'х у й',
  'х!у!й',
  'х ! у ! й',
  'х-у-й',
  'х - у - й',
  'х?у?й',
  'х ? у ? й',
  'хер',
  'х ер',
  'хе р',
  'х е р',
  'х!е!р',
  'х ! е ! р',
  'х-е-р',
  'х - е - р',
  'х?е?р',
  'х ? е ? р',
  'ахуй',
  'ехуй',
  'охуй',
  'ихуй',
  'ехуй',
  'ухуй',
  'ахуй',
  'ахуй',
  'пизд',
  'чмо',
  'ч м о',
  'ч-м-о',
  'ч - м - о',
  'ч м о',
  'ч ! м ! о',
  'ч!м!о',
  'ч?м?о',
  'ч ? м ? о',
  'чмыр',
  'ч м ы р',
  'еб',
  'е б',
  'е!б!',
  'е ! б !',
  'е?б?',
  'е ? б ?',
  'е-б',
  'е - б',
  'ёб',
  'ё б',
  'ё!б!',
  'ё ! б !',
  'ё?б?',
  'ё ? б ?',
  'ё-б',
  'ё - б',
  'бляд',
  'б л я д',
  'б!л!я!д',
  'б ! л ! я ! д',
  'б?л?я?д',
  'б ? л ? я ? д',
  'б-л-я-д',
  'б - л - я - д',
  'сука',
  'с у к а',
  'с!у!к!а',
  'с ! у ! к ! а',
  'с?у?к?а',
  'с ? у ? к ? а',
  'с-у-к-а',
  'с - у - к - а',
  'дура',
  'д у р а',
  'д!у!р!а',
  'д ! у ! р ! а',
  'д?у?р?а',
  'д ? у ? р ? а',
  'д-у-р-а',
  'д - у - р - а',
  'пизд',
  'п и з д',
  'п!и!з!д',
  'п ! и ! з ! д',
  'п?и?з?д',
  'п ? и ? з ? д',
  'п-и-з-д',
  'п - и - з - д',
  'п е з д',
  'п!е!з!д',
  'п ! е ! з ! д',
  'п?е?з?д',
  'п ? е ? з ? д',
  'п-е-з-д',
  'п - е - з - д',
  'муда',
  'м у д а',
  'м!у!д!а',
  'м ! у ! д ! а',
  'м?у?д?а',
  'м ? у ? д ? а',
  'м-у-д-а',
  'м - у - д - а',
  'говн',
  'г о в н',
  'г!о!в!н',
  'г ! о ! в ! н',
  'г?о?в?н',
  'г ? о ? в ? н',
  'г-о-в-н',
  'г - о - в - н',
  'урод',
  'у р о д',
  'у!р!о!д',
  'у ! р ! о ! д',
  'у?р?о?д',
  'у ? р ? о ? д',
  'у-р-о-д',
  'у - р - о - д',
  'пидор',
  'п и д о р',
  'п!и!д!о!р',
  'п ! и ! д ! о ! р',
  'п?и?д?о?р',
  'п ? и ? д ? о ? р',
  'п-и-д-о-р',
  'п - и - д - о - р',
  'пидар',
  'п и д а р',
  'п!и!д!а!р',
  'п ! и ! д ! а ! р',
  'п?и?д?а?р',
  'п ? и ? д ? а ? р',
  'п-и-д-а-р',
  'п - и - д - а - р',
  'пидер',
  'п и д е р',
  'п!и!д!е!р',
  'п ! и ! д ! е ! р',
  'п?и?д?е?р',
  'п ? и ? д ? е ? р',
  'п-и-д-е-р',
  'п - и - д - е - р',
  'гондон',
  'г о н д о н',
  'г!о!н!д!о!н',
  'г ! о ! н ! д ! о ! н',
  'г?о?н?д?о?н',
  'г ? о ? н ? д ? о ? н',
  'г-о-н-д-о-н',
  'г - о - н - д - о - н',
  'гандон',
  'г а н д о н',
  'г!а!н!д!о!н',
  'г ! а ! н ! д ! о ! н',
  'г?а?н?д?о?н',
  'г ? а ? н ? д ? о ? н',
  'г-а-н-д-о-н',
  'г - а - н - д - о - н',

]

const countTemplates = 6;// Количество шаблонов
const randomNumber = Math.round(Math.random() * 100) / 100;
const maxLength = 150; // Максимальное кол-во символов для ввода

let elMain, // Главный элемент
    elChoice, // Блок выбора шаблонов
    elChoiceTemplates, // Блок с самими шаблоанми
    elEditor, // Блок редакторвания
    elEditorWrapper, // Блок поля ввода
    elInputArea, // Блок Поля ввода
    elInput, // Поле ввода
    valueFontStyle, // Значение для выбора стилей текста
    elButtonsColor, // Блок цветовых кнопок
    elBtnBack, // Кнопка Назад
    elBtnReady, // Кнопка готово
    elBtnSkip, // Кнопка Пропустить
    elRemain, // Блок для количества оставшихя символов при вводе текста
    elRemainCharacters, // Количество оставшихя символов при вводе текста
    oldTemplate, // Переменная для старого шаблона у редактора
    elFooterImg, // Переменная для картинки в футере
    elLoader; // Переменная для лоадера

// Функция постановки курсора в конец строки
function setCursorToEndString(){
  const range = document.createRange();
  const selection = window.getSelection() || null;
  if (selection) {
    range.selectNodeContents(elInput);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    elInput.focus();
  }
}

// Функция устанавливет размеры шаблонов в блоке выбора
function setTemplatesSizesInChoice() {
  if(window.screen.width < 767) {
    elChoiceTemplates.childNodes.forEach((item) => {
      //item.style.width = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
      if(!elChoice.classList.contains('is-hidden')) {
        item.style.height = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
      }
      if(!elEditor.classList.contains('is-hidden')) {
        item.style.height = (elEditor.offsetWidth - 16 * 3) /2 + 'px';
      }
    });
  }

}

// Функция устанавливает высоту странице
function setHeightMain() {
  elMain.style.height = `${document.documentElement.scrollHeight}px`;
}

// Функция обработки получения Фокуса полем ввода
function focusInput() {
  elInputArea.addEventListener('click', () => {
    if(!getElement('.js-submit')){
      elButtonsColor.classList.remove('is-hidden');
      elBtnReady.classList.remove('is-hidden');
      elBtnSkip.classList.add('is-hidden');
      getElement('.js-pseudo-buttons').classList.add('is-hidden');
      if(elInput.textContent.length) {
        elInput.focus();
      }
      else {
        setCursorToEndString();
      }
    }
  })
}

// Функция устанавливает высоту текстареа
function setHeightInputArea() {
  elInputArea.style.height = `${elMain.offsetWidth - 16}px`;
}

// Функция установки полю ввода случайным образом одного из трех стилей текста
function setRandomFontStyle() {
  if(randomNumber < 0.33) {
    valueFontStyle = 1;
  }
  else if(randomNumber > 0.33 && randomNumber < 0.66){
    valueFontStyle = 2;
  }
  else {
    valueFontStyle = 3;
  }

  elInputArea.dataset.valueFontStyle = valueFontStyle;
  elInputArea.classList.add(`font-style-${valueFontStyle}`);
}

// Функция установки выбранного цвета в редакторе
function chooseTextColor() {
  const _arrButColors = elButtonsColor.childNodes;// Собрал всех потомков elButtonsColor
  const arrButtonsColor =[]; // Массив для цветовых кнопок
  for(let i=0; i<_arrButColors.length; i++) {// Наполнение массива цветовых кнопок
    if(_arrButColors[i].nodeType === 1){
      arrButtonsColor.push(_arrButColors[i]);
    }
  }
  arrButtonsColor.forEach((item) => {
    elInputArea.dataset.color = '3'; // Это по умолчанию
    let oldColor;
    if(item.nodeType === 1) {// Текущей цветовой кнопке назанчаем класс is-active
      item.addEventListener('click', () => {
        for(let i=0; i < arrButtonsColor.length; i++){// Удаляем у всех цветовых кнопок класс is-active
          arrButtonsColor[i].classList.remove('is-active');
        }
        oldColor = `color-${elInputArea.dataset.color}`;// Старый цвет, который поменяем на новый
        item.classList.add('is-active');
        elInputArea.dataset.color = item.dataset.color;
        elInputArea.classList.replace(`${oldColor}`, `color-${elInputArea.dataset.color}`);
        setCursorToEndString();
      })
    }
  })
}

// Функция перехода назад
function goBack() {
  elBtnBack.addEventListener('click', () => {
    if(getElement('.js-submit')) {
      getElement('.js-submit').remove();
      elBtnReady.classList.remove('is-hidden');
      elButtonsColor.classList.remove('is-hidden');
      elInput.setAttribute('contenteditable', 'true');
      elRemain.classList.remove('is-hidden');
      elMain.classList.remove('is-ready');
      elFooterImg.src = 'images/footer_img1.png';
      setCursorToEndString();
    }
    else if(!getElement('.js-pseudo-buttons').classList.contains('is-hidden')) {
      getElement('.js-pseudo-buttons').remove();
      // Скрываем редактор
      elEditor.classList.add('is-hidden');

      window.localStorage.clear();
      oldTemplate = `template-${elInputArea.dataset.template}`;

      // Показываем выбор шаблонов
      elChoice.classList.remove('is-hidden');
    }
    else {
      elBtnSkip.classList.remove('is-hidden');
      elButtonsColor.classList.add('is-hidden');
      elBtnReady.classList.add('is-hidden');
      getElement('.js-pseudo-buttons').classList.remove('is-hidden');
    }
  })
}

function changeTagOnBr(){
  const selection = window.getSelection(),
      range = selection.getRangeAt(0),
      node = document.getSelection().anchorNode,
      pNode = node.parentNode;
  let tag = pNode.nodeName.toUpperCase();
  switch(tag) {
    case 'P':
      tag = 'BR';
      break;

    case 'DIV':
      tag = 'BR';
      break;
  }

  const el = document.createElement( tag );

  range.deleteContents();
  range.insertNode(el);

  if ('BR'===tag) {
    range.setStartAfter(el);
    range.setEndAfter(el);
  } else {
    range.setStart(el, 0);
    range.setEnd(el, 0);
  }

  const ze = document.createTextNode("\u200B");
  range.insertNode(ze);
  range.setStartBefore(ze);
  range.setEndBefore(ze);

  selection.removeAllRanges();
  selection.addRange(range);
}

// Функция ввода тектса
function enterText() {
  let isSelectedBadWord = false;
  let badText = '';

  elInput.addEventListener('input', (e) => {
    elRemainCharacters.textContent = elInput.textContent.length;

    //Если юзер ввел более 5 символов, то активируем кнопку Готово
    if(elInput.textContent.length > 5) {
      elBtnReady.removeAttribute('disabled');
    }
    else {
      elBtnReady.setAttribute('disabled', 'disabled');
    }

    // Если юзер ввел более 150 символов , то больше не даем вводить
    if(elInput.textContent.length > maxLength-1) {
      elInput.textContent = elInput.textContent.substr(0, maxLength-1);
      setCursorToEndString();
    }

    // Устанавливаем высоту всего блока ввода для непосредственно места ввода
    if(elInput.offsetHeight >= elInputArea.offsetHeight - 30 - 60) {
      elInput.style.height = `${elInputArea.offsetHeight - 30 - 60}px`;
    }

    // Не даем вводить символы из массива forbiddenChars
    forbiddenChars.forEach((item) => {
      if(elInput.textContent.includes(item)) {
        elInput.textContent = elInput.textContent.replace(item, '');
        setCursorToEndString();
      }
    })

    // Проверяем на наличие плохих слов
    // И если есть не даем нажать готово и выделяем плохое слово
    badWords.forEach((item) => {
      if(elInput.textContent.toLowerCase().includes(item)){
        elBtnReady.setAttribute('disabled', 'true');
        const startAlarm = elInput.textContent.indexOf(item);
        let startPos;
        if(startAlarm === 0) {
          startPos = 0;
        }
        else {
          if(elInput.textContent.lastIndexOf(' ', startAlarm) === -1) {
            startPos = startAlarm;
          }
          else {
            startPos = elInput.textContent.lastIndexOf(' ', startAlarm) + 1;
          }
        }
        let endAlarm;
        if(elInput.textContent.indexOf(" ", startAlarm) === -1) {
          endAlarm = elInput.textContent.length;
        }
        else {
          endAlarm = elInput.textContent.indexOf(' ', startAlarm);
        }
        badText = elInput.textContent.substring(startPos, endAlarm);
        const badFull = `<span>${elInput.textContent.substring(startPos, endAlarm)}</span>`;
        elInput.innerHTML = elInput.textContent.replace(badText, badFull);
        isSelectedBadWord = true;
        setCursorToEndString();
      }
    })

    // Если нажали BackSpace и уже было плохое слово в тексте, то исправив плохой текст
    // убираем и обертку span
    if(e.inputType === 'deleteContentBackward' && isSelectedBadWord) {
      alert(1);
      let str = elInput.innerHTML.toString();
      if(!str.includes(badText)) {
        let textBeforeSpan = str.substring(0, str.indexOf('<span'));
        let textInSpan = str.substring(str.indexOf('<span') + 6, str.indexOf('</span'));
        let textAfterSpan = str.substr(str.indexOf('</span') + 7);
        elInput.innerHTML = textBeforeSpan + textInSpan + textAfterSpan;
        setCursorToEndString();
      }
    }
  })

  elInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
      if(elInput.offsetHeight >= elInputArea.offsetHeight - 50 - 60) {
        e.preventDefault();
        setCursorToEndString();
      }
    }
  })
}

// Функция сохрнения в localStorage данных о стилях поля ввода текста
function saveStyleInputArea() {
  window.localStorage.setItem('name-template', elInputArea.dataset.template.toString());
  window.localStorage.setItem('fontStyle', elInputArea.dataset.valueFontStyle.toString());
  window.localStorage.setItem('color', elInputArea.dataset.color.toString());
}

// Функция обработки нажатия кнопки Готово
function ready() {
  elBtnReady.addEventListener('click', () => {
    elBtnReady.classList.add('is-hidden'); // скрываем кнопку Готово
    elButtonsColor.classList.add('is-hidden'); // скрываем цветовые кнопки
    elRemain.classList.add('is-hidden'); // скрываем блок с количеством оставшихся символов
    elMain.classList.add('is-ready');
    elFooterImg.src = 'images/footer_img2.png';

    const elDiv = document.createElement('div');
    elDiv.classList.add('submit');
    elDiv.classList.add('js-submit');
    const elButton = document.createElement('button');
    const goWall = function () {
      saveStyleInputArea();
      window.localStorage.setItem('isGoFromWall', 'true');
      window.localStorage.setItem('templateMessage', `${elInputArea.dataset.template}`);
      window.localStorage.setItem('colorMessage', `${elInputArea.dataset.color}`);
      window.localStorage.setItem('fontStyleMessage', `${elInputArea.dataset.valueFontStyle}`);
      window.localStorage.setItem('textMessage', `${elInput.innerHTML}`);

      /**
       * TODO: ПОЛОЖИТЬ ПРАВИЛЬНЫЕ ДАННЫЕ В ФОРМУ
       */
      const form = new FormData();
      form.append("template", elInputArea.dataset.template);
      form.append("uuid", elInputArea.dataset.template);
      form.append("font_style", elInputArea.dataset.valueFontStyle);
      form.append("color", elInputArea.dataset.color);
      form.append("text", elInput.innerHTML);

      /**
       * TODO: ПЕРЕД ФЕТЧЕМ НАДО ВКЛЮЧИТЬ ИНДИКАТОР ЗАГРУЗКИ
       */

      elLoader.classList.remove('is-hidden');

      fetch(`https://kinder-api.brainrus.ru/add`, {
        method: "post",
        body: form,
      })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }

            throw res;
          })
          .then((json) => {
            if (json.result === true) {
              let a = json.uuid;
              window.localStorage.setItem('uuid', a);
              /**
               * TODO: ВЫКЛЮЧИТЬ ИНДИКАТОР ЗАГРУЗКИ
               */
                elLoader.classList.add('is-hidden');
                window.location.href ='wall.html';
            }

            throw new Error("Ошибка добавления записи");
          })
          .catch(() => {
            /**
             * TODO: ПОКАЗАТЬ КАКОЕ-ТО СООБЩЕНИЕ НА СЛУЧАЙ ОШИБКИ
             */
          });
    }
    const innerDiv = document.createElement('div');
    innerDiv.textContent = 'Отправить';
    elButton.append(innerDiv);
    elButton.addEventListener('click', goWall);
    elDiv.append(elButton);
    elEditorWrapper.append(elDiv);
    elInput.removeAttribute('contenteditable');
  })
}

// Функция обработки нажаия кнопки Пропустить
function skip() {
  elBtnSkip.addEventListener('click', () => {
    window.localStorage.setItem('isGoFromWall', 'true');
    saveStyleInputArea();
    window.location.href ='wall.html';
  })
}

// Функция проверки пришли ли мы на index из wall
function checkIsGoFromWall() {
  if(window.localStorage.getItem('isGoFromWall')) {
    elChoice.classList.add('is-hidden');
    elEditor.classList.remove('is-hidden');
    elBtnReady.classList.add('is-hidden');
    elButtonsColor.classList.add('is-hidden');
    elFooterImg.src = 'images/footer_img1.png';

    let elImg = document.createElement('img');
    elImg.src = 'images/pseudo-buttons.png';
    elImg.classList.add('pseudo-buttons');
    elImg.classList.add('js-pseudo-buttons');
    elEditorWrapper.append(elImg);
    if(window.localStorage.getItem('name-template')) {
      elInputArea.dataset.template = window.localStorage.getItem('name-template');
      elInputArea.classList.add(`template-${elInputArea.dataset.template}`);
    }
    if(window.localStorage.getItem('fontStyle')) {
      elInputArea.dataset.valueFontStyle = window.localStorage.getItem('fontStyle');
      elInputArea.classList.add(`font-style-${elInputArea.dataset.valueFontStyle}`);
    }
    if(window.localStorage.getItem('color')) {
      const oldColor = `color-${elInputArea.dataset.color}`;

      elInputArea.dataset.color = window.localStorage.getItem('color');
      elInputArea.classList.add(`color-${elInputArea.dataset.color}`);
      elInputArea.classList.replace(`${oldColor}`, `color-${elInputArea.dataset.color}`);
    }

    window.localStorage.clear();
  }
}

// const preloader = document.querySelector(".preloader");

const resize = () => {
  if(window.screen.width < 1024) {
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
  elMain = getElement('.js-main');
  elChoice = getElement('.js-choice');
  elChoiceTemplates = getElement('.js-choice-templates');
  elEditor = getElement('.js-editor');
  elEditorWrapper = getElement('.js-editor-wrapper');
  elInputArea = getElement('.js-input-area');
  elInput = getElement('.js-input');
  elButtonsColor = getElement('.js-buttons-color');
  elBtnBack = getElement('.js-btn-back');
  elBtnSkip = getElement('.js-btn-skip');
  elBtnReady = getElement('.js-btn-ready');
  elRemain = getElement('.js-remain');
  elRemainCharacters = getElement('.js-remain-characters');
  elFooterImg = getElement('.js-footer-img');
  elLoader = getElement('.js-loader');

  setHeightMain();

  // Создает 6 блоков для выбора шаблона
  function createTemplates() {
    for(let i=1; i <= countTemplates; i++) {
      const elDiv = document.createElement('div');
      elDiv.classList.add('choice__item');
      elDiv.classList.add(`template-${i}`);
      elDiv.setAttribute('data-template', i);
      elChoiceTemplates.append(elDiv);
      const goToTemplate = function () { // Переход на шаблон в редактор
        elChoice.classList.add('is-hidden');
        elEditor.classList.remove('is-hidden');
        elButtonsColor.classList.add('is-hidden');
        elBtnReady.classList.add('is-hidden');
        elInputArea.dataset.template = this.dataset.template;

        if(oldTemplate) {//Если есть старый шаблон, то класс для него меняем на класс для нового шаблона
          elInputArea.classList.replace(oldTemplate,`template-${elInputArea.dataset.template}`);
        }
        else {
          elInputArea.classList.add(`template-${elInputArea.dataset.template}`);
        }

        let elImg = document.createElement('img');
        elImg.src = 'images/pseudo-buttons.png';
        elImg.classList.add('pseudo-buttons');
        elImg.classList.add('js-pseudo-buttons');
        elEditorWrapper.append(elImg);
        setRandomFontStyle();
      }
      elDiv.addEventListener('click', goToTemplate);
    }
  }

  createTemplates();
  setTemplatesSizesInChoice();
  focusInput();
  setHeightInputArea();
  chooseTextColor();
  goBack();
  enterText();
  ready();
  skip();
  checkIsGoFromWall();

  /*elInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 8) {
      if(elInput.innerHTML.toString().includes('<spa')) {
        let textBeforeSpan = elInput.innerHTML.toString().substring(0, elInput.innerHTML.toString().indexOf('<spa'));
        let textAfterSpan = elInput.innerHTML.toString().substr(elInput.innerHTML.toString().indexOf('</') + 7);
        let textInSpan = elInput.innerHTML.toString().substring(textBeforeSpan.length + 6, elInput.innerHTML.toString().indexOf('</'));
        console.log(textBeforeSpan, textInSpan, textAfterSpan);
        elInput.textContent = textBeforeSpan + textInSpan + textAfterSpan;
        setCursorToEndString();
      }
    }
  })*/
}

window.onresize = () => {
  setHeightMain();
  setTemplatesSizesInChoice();
  setHeightInputArea();
  resize();
}

window.addEventListener("orientationchange", resize);
