const searchInput = document.getElementById('input');
const searchLink = document.getElementById('searchLink');
const clothing = document.getElementById("clothing")
const accessories = document.getElementById("accessories")
const about = document.getElementById("about")
const contact = document.getElementById("contact")
const menuBtn = document.querySelector(".menu-button")
const hideMenu = document.querySelector(".btn-hide")
const sidebar = document.querySelector('#sidebar')
const badge = document.querySelector("#badge")

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
    if (searchInput.value.trim() !== '') {
        window.location.href = `search.html?name=${searchInput.value}`;
    }
});

menuBtn.addEventListener("click", () => {
    badge.style.display = 'none'
    sidebar.style.right = '0'
})

hideMenu.addEventListener("click", () => {
    badge.style.display = 'block'
    sidebar.style.right = '-500px'
})

