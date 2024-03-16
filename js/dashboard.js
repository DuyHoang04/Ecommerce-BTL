
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});


const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})


const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
})


if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
})

// dark mode
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
})

function dynamicClothingRow(ob) {
    let row = document.createElement("tr");

    let idCell = document.createElement("td");
    idCell.textContent = ob.id;

    let nameCell = document.createElement("td");
    let image = document.createElement('img');
    let p = document.createElement('p');

    p.textContent = ob.name;
    image.src = ob.photos[0];
    nameCell.className = 'name';
    nameCell.appendChild(image);
    nameCell.appendChild(p);

    let categoryCell = document.createElement("td");
    categoryCell.textContent = ob.isAccessory ? "Quần Áo" : "Phụ kiện";

    let statusCell = document.createElement("td");
    let statusSpan = document.createElement("span");
    statusSpan.textContent = "Còn Hàng";
    statusSpan.className = "status";
    statusCell.appendChild(statusSpan);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(statusCell);

    return row;
}

fetch("https://65f02c4bda8c6584131afec1.mockapi.io/api/v1/products")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log('call successful');
        contentTitle = data;
        let tbody = document.querySelector('.body');
        for (let i = 0; i < contentTitle.length; i++) {
            tbody.appendChild(dynamicClothingRow(contentTitle[i]));
        }
        console.log("Success");
    })
    .catch(error => {
        console.error("Error:", error);
    });
