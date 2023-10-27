function getElement(selector, parent = document) {
    const elem = parent.querySelector(selector);
    if (!elem) {
        throw new Error(`Element ${selector} not found`);
        // return null;
    }

    return elem;
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
    elInputArea, // Поле ввода
    valueFontStyle, // Значение для выбора стилей текста
    elButtonsColor, // Блок цветовых кнопок
    elBtnBack, // Кнопка Назад
    elBtnReady, // Кнопка готово
    isExistButtonSubmit = false, // Флаг, показывающий созадана ли кнопка отправить
    elRemainCharacters // Блок для количества оставшихя символов при вводе текста

// Функция устанавливет размеры шаблонов в блоке выбора
function setTemplatesSizesInChoice() {
    elChoiceTemplates.childNodes.forEach((item) => {
        //item.style.width = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
        item.style.height = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
    })
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
        elInputArea.dataset.color = '0';
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
            })
        }
    })
}

// Функция перехода назад
function goBack() {
    elBtnBack.addEventListener('click', () => {
        if(isExistButtonSubmit) {

        }
        else {
            // Скрываем редактор
            elEditor.classList.add('is-hidden');

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
            elBtnReady.classList.add('is-ready');
        }
        else {
            elBtnReady.classList.remove('is-ready');
        }
    })
}

window.onload = () => {
    elMain = getElement('.js-main');
    elChoice = getElement('.js-choice');
    elChoiceTemplates = getElement('.js-choice-templates');
    elEditor = getElement('.js-editor');
    elInputArea = getElement('.js-input-area');
    elButtonsColor = getElement('.js-buttons-color');
    elBtnBack = getElement('.js-btn-back');
    elBtnReady = getElement('.js-btn-ready');
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
                elInputArea.classList.add(`template-${this.dataset.template}`);
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
}

window.onresize = () => {
    setHeightMain();
    setTemplatesSizesInChoice();
    setHeightInputArea();
}