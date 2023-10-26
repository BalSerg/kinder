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

let elMain, elChoice, elChoiceTemplates, elEditor, elInputArea;


// Функция устанавливет размеры шаблонов в блоке выбора
function setTemplatesSizesInChoice() {
    elChoiceTemplates.childNodes.forEach((item) => {
        item.style.width = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
        item.style.height = (elChoice.offsetWidth - 16 * 3) /2 + 'px';
    })
}

// Функция устанавливает высоту странице
function setHeightMain() {
    elMain.style.height = `${screen.height}px`;
}

function setHeightInputArea() {
    elInputArea.style.height = `${elMain.offsetWidth - 16}px`;
}

window.onload = () => {
    elMain = getElement('.js-main');
    elChoice = getElement('.js-choice');
    elChoiceTemplates = getElement('.js-choice-templates');
    elEditor = getElement('.js-editor');
    elInputArea = getElement('.js-input-area');

    setHeightMain();

    // Создает 6 блоков для выбора шаблона
    function createTemplates() {
        for(let i=1; i <= countTemplates; i++) {
            const elDiv = document.createElement('div');
            elDiv.classList.add('choice__item');
            elDiv.classList.add(`template-${i}`);
            elDiv.setAttribute('data-template', i);
            elChoiceTemplates.append(elDiv);
            const goToTemplate = function () {
                elChoice.classList.add('is-hidden');
                elEditor.classList.remove('is-hidden');
                elInputArea.classList.add(`template-${this.dataset.template}`);
            }
            elDiv.addEventListener('click', goToTemplate);
        }
    }

    createTemplates();
    setTemplatesSizesInChoice();
    setHeightInputArea();
}

window.onresize = () => {
    setHeightMain();
    setTemplatesSizesInChoice();
    setHeightInputArea();
}