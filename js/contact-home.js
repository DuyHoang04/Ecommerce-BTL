const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendButton = document.querySelector('.click-toast');

const reloadData = () => {
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}

sendButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (nameInput.value.trim() === '') {
        toast({
            title: "Thất bại!",
            message: "Thiếu trường họ và tên",
            type: "error",
            duration: 5000
        });
    }
    else if (emailInput.value.trim() === '') {
        toast({
            title: "Thất bại!",
            message: "Thiếu trường email",
            type: "error",
            duration: 5000
        });
    }
    else if (messageInput.value.trim() === '') {
        toast({
            title: "Thất bại!",
            message: "Thiếu trường message",
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
        reloadData();
    }
});