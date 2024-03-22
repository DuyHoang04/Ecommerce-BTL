const nameInput = document.getElementById('customerName');
const emailInput = document.getElementById('customerEmail');
const messageInput = document.getElementById('customerNote');
const captchaInput = document.getElementById('captcha');
const phoneInput = document.getElementById('customerPhone');
const captchaText = document.getElementById('text-captcha');
const sendButton = document.getElementById("customerOrder");
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

var captchaStr = "";

let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'];

function generateCaptcha() {
    let emptyArr = [];

    for (let i = 1; i <= 7; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }

    captchaStr = emptyArr.join('');

    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(captchaStr, captchaText.width / 4, captchaText.height / 2);
}

generateCaptcha();

const reloadData = () => {
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    captchaInput.value = "";
    phoneInput.value = "";
}

sendButton.addEventListener('click', async (event) => {
    console.log(emailInput.value.trim());
    event.preventDefault();
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '' || captchaInput?.value.trim() === '' || phoneInput.value.trim() === '') {
        toast({
            title: "Thất bại!",
            message: "Các trường phải đầy đủ",
            type: "error",
            duration: 5000
        });
    } else if (captchaInput.value.trim() !== captchaStr) {
        toast({
            title: "Thất bại!",
            message: "Captcha sai, Vui lòng thử lại",
            type: "error",
            duration: 5000
        });
    } else {
        toast({
            title: "Thành công!",
            message: "Gửi thành công",
            type: "success",
            duration: 5000
        });
        generateCaptcha();
        reloadData();
    }
});