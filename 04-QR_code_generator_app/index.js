const download = document.querySelector('.download');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qr-code');
const qrText = document.querySelector('.qr-text');
const sharedBtn = document.querySelector('.shared-btn');
const sizes = document.querySelector('.sizes');

//Listeners
dark.addEventListener('input', handleDarkColor);
light.addEventListener('input', handlelightColor);
qrText.addEventListener('input', handleQRText);
sizes.addEventListener('change', handleSizes);
sharedBtn.addEventListener('click', handleShared);

const defaultUrl = 'https://github.com/RemyA94';
let colorLight = '#fff',
    colorDark = '#000',
    text = defaultUrl,
    size = 300;


function handleDarkColor(e) {
    colorDark = e.target.value;
    generatedQRCode();
};

function handlelightColor(e) {
    colorLight = e.target.value;
    generatedQRCode();
};

function handleQRText(e) {
    const value = e.target.value;
    text = value;

    if (!value) 
        text = defaultUrl;
    generatedQRCode();
};

async function generatedQRCode() {
    qrContainer.innerHTML = '';
    new QRCode('qr-code', {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
};

async function handleShared() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], 'QRCode.png', { type: blob.type, });
            await navigator.share({
                files: [file],
                title: text,

            });
        } catch (e) {
            console.log(e);
            alert('Your browser does not support sharing.');
        }
    }, 100);
};

function handleSizes(e) {
    size = e.target.value;
    generatedQRCode();
};

const resolveDataUrl = async () => new Promise((resolve, reject) => {
    return setTimeout(() => {
        const img = document.querySelector('#qr-code img');
        if (img.currentSrc) {
            resolve(img.currentSrc);
            return;
        }
        const canvas = document.querySelector('canvas');
        resolve(canvas.toDataURL());
    }, 50);
});

generatedQRCode();





























