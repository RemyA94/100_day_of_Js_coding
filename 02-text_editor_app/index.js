
let advencedOptionButton = document.querySelectorAll('.adv-options-button');
let alignButtons = document.querySelectorAll('.align');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let formatButton = document.querySelectorAll('.format');
let linkButton = document.getElementById('createLink');
let optionsButtons = document.querySelectorAll('.option-button');
let scriptButtons = document.querySelectorAll('.script');
let spacingButtons = document.querySelectorAll('.spacing');
let writingArea = document.getElementById('text-input');


let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

let hValues = [
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
];


const inicializer = () => {
    hightlighter(alignButtons, true);
    hightlighter(spacingButtons, true);
    hightlighter(formatButton, false);
    hightlighter(scriptButtons, true);

    fontList.map((value) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i < 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    };

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    });
});

advencedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener('click', () => {
    let userLink = prompt('Enter a URL');
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink)
    } else if (/https/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink)
    }
});

const hightlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        if (needsRemoval) {
            let alreadyActive = false;
            if (button.classList.contains('active')) {
                alreadyActive = true;
            }
            hightlighterRemover(className);
            if (!alreadyActive) {
                button.classList.add('active');
            }
        } else {
            button.classList.toggle('active');
        }
    });
};

const hightlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    });
};

window.onload = inicializer();