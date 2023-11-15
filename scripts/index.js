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

const countTemplates = 6;// Количество шаблонов
const randomNumber = Math.round(Math.random() * 100) / 100;

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
    elFooterImg; // Переменная для картинки в футере

// Функция устанавливет размеры шаблонов в блоке выбора
function setTemplatesSizesInChoice() {
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

// Функция устанавливает высоту странице
function setHeightMain() {
  elMain.style.height = `${document.documentElement.scrollHeight}px`;
}

// Функция обработки получения Фокуса полем ввода
function focusInput() {
  elInputArea.addEventListener('click', () => {
    if(!getElement('.js-submit')){
      elInput.focus();
      elButtonsColor.classList.remove('is-hidden');
      elBtnReady.classList.remove('is-hidden');
      elBtnSkip.classList.add('is-hidden');
      getElement('.js-pseudo-buttons').classList.add('is-hidden');
      elInput.focus();
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
        elInput.focus();
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
      elMain.classList.remove('is-ready');
      elFooterImg.src = 'images/footer_img1.png';
      elInput.focus();
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

// Функция ввода тектса
function enterText() {
  elInput.addEventListener('input', () => {
    elRemainCharacters.textContent = elInput.textContent.length;

    //Если юзер ввел более 20 символов, то активируем кнопку Готово
    if(elInput.textContent.length > 5) {
      elBtnReady.removeAttribute('disabled');
    }
    else {
      elBtnReady.setAttribute('disabled', 'disabled');
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
      window.location.href ='wall.html';
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
function checkUrl() {
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
  checkUrl();
}

window.onresize = () => {
  setHeightMain();
  setTemplatesSizesInChoice();
  setHeightInputArea();
}
