const searchInput = document.getElementById('input');
const searchLink = document.getElementById('searchLink');
const clothing = document.getElementById("clothing")
const accessories = document.getElementById("accessories")
const about = document.getElementById("about")
const contact = document.getElementById("contact")
const menuBtn = document.querySelector(".menu-button")
const hideMenu = document.querySelector(".btn-hide")
const sidebar = document.querySelector('#sidebar')
const cartIcon = document.querySelector(".cartIcon")

const currentPage = window.location.pathname.split("/").pop();
console.log(currentPage);

if (currentPage === "clothing.html") {
    clothing.style.color = "#F45703";
} else if (currentPage === "accessories.html") {
    accessories.style.color = "#F45703";
}
else if (currentPage === "about.html") {
    about.style.color = "#F45703";
} else if (currentPage === "contact.html") {
    contact.style.color = "#F45703";
}

searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && searchInput.value.trim() !== '') {
        window.location.href = `search.html?name=${searchInput.value}`;
    }
});

searchLink.addEventListener('click', function () {
    console.log("Hello");
    if (searchInput.value.trim() !== '') {
        window.location.href = `searc.html?name=${searchInput.value}`;
    }
});

menuBtn.addEventListener("click", () => {
    cartIcon.style.zIndex = "-1"
    sidebar.style.right = '0'
})

hideMenu.addEventListener("click", () => {
    cartIcon.style.zIndex = "0"
    sidebar.style.right = '-500px'
})

