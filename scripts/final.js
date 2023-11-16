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

let elMain;

// Функция устанавливает высоту странице
function setHeightMain() {
    elMain.style.height = `${document.documentElement.scrollHeight}px`;

    console.log(document.documentElement.scrollHeight);
}

window.onload = () => {
    const audioBird1 = document.querySelector("#audio-bird1");
    if(audioBird1) {
        audioBird1.play();
    }

    elMain = getElement('.js-main');

    setHeightMain();
}