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
    elInputArea, // Поле ввода
    valueFontStyle, // Значение для выбора стилей текста
    elButtonsColor, // Блок цветовых кнопок
    elBtnBack, // Кнопка Назад
    elBtnReady, // Кнопка готово
    elRemain, // Блок для количества оставшихя символов при вводе текста
    elRemainCharacters, // Количество оставшихя символов при вводе текста
    oldTemplate // Переменная для старого шаблона у редактора


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
  elMain.style.height = `${screen.height}px`;
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
        elInputArea.focus();
      })
    }
  })
}

// Функция перехода назад
function goBack() {
  elBtnBack.addEventListener('click', () => {
    elMain.classList.remove('is-ready');
    if(getElement('.js-submit')) {
      getElement('.js-submit').remove();
      elBtnReady.classList.remove('is-hidden');
      elButtonsColor.classList.remove('is-hidden');
      elInputArea.removeAttribute('readonly');
      elInputArea.focus();
    }
    else {
      // Скрываем редактор
      elEditor.classList.add('is-hidden');
      oldTemplate = `template-${elInputArea.dataset.template}`

      // Показываем выбор шаблонов
      elChoice.classList.remove('is-hidden');
    }
  })
}

// Функция ввода тектса
function enterText() {
  elInputArea.addEventListener('input', () => {
    elRemainCharacters.textContent = elInputArea.value.length;

    //Если юзер ввел более 20 символов, то активируем кнопку Готово
    if(elInputArea.value.length > 20) {
      elBtnReady.removeAttribute('disabled');
    }
    else {
      elBtnReady.setAttribute('disabled', 'disabled');
    }
  })
}

// Функция обработки нажатия кнопки Готово
function ready() {
  elBtnReady.addEventListener('click', () => {
    elBtnReady.classList.add('is-hidden'); // скрываем кнопку Готово
    elButtonsColor.classList.add('is-hidden'); // скрываем цветовые кнопки
    elRemain.classList.add('is-hidden'); // скрываем блок с количеством оставшихся символов
    elMain.classList.add('is-ready');

    const elDiv = document.createElement('div');
    elDiv.classList.add('submit');
    elDiv.classList.add('js-submit');
    const elButton = document.createElement('button');
    elButton.textContent = 'Отправить';
    const goWall = function () {
      window.location.href = 'wall.html';
    }
    elButton.addEventListener('click', goWall);
    elDiv.append(elButton);
    elEditorWrapper.append(elDiv);
    elInputArea.setAttribute('readonly', 'true');
  })
}

window.onload = () => {
  elMain = getElement('.js-main');
  elChoice = getElement('.js-choice');
  elChoiceTemplates = getElement('.js-choice-templates');
  elEditor = getElement('.js-editor');
  elEditorWrapper = getElement('.js-editor-wrapper');
  elInputArea = getElement('.js-input-area');
  elButtonsColor = getElement('.js-buttons-color');
  elBtnBack = getElement('.js-btn-back');
  elBtnReady = getElement('.js-btn-ready');
  elRemain = getElement('.js-remain');
  elRemainCharacters = getElement('.js-remain-characters');

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
        elInputArea.dataset.template = this.dataset.template;

        if(oldTemplate) {//Если есть старый шаблон, то класс для него меняем на класс для нового шаблона
          elInputArea.classList.replace(oldTemplate,`template-${elInputArea.dataset.template}`);
        }
        else {
          elInputArea.classList.add(`template-${elInputArea.dataset.template}`);
        }

        setRandomFontStyle();
        elInputArea.focus();
      }
      elDiv.addEventListener('click', goToTemplate);
    }
  }

  createTemplates();
  setTemplatesSizesInChoice();
  setHeightInputArea();
  chooseTextColor();
  goBack();
  enterText();
  ready();
}

window.onresize = () => {
  setHeightMain();
  setTemplatesSizesInChoice();
  setHeightInputArea();
}
