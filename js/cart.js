console.clear();

// Kiểm tra và cập nhật số lượng sản phẩm trong giỏ hàng từ cookie
if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

let cartContainer = document.getElementById('cartContainer')


let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// sản phẩm trong giỏ hàng
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Tổng tiền: $' + Intl.NumberFormat().format(ob.price))
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)

    return cartContainer
}

// tổng tiền của giỏ hàng
let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Thành tiền')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// fuction update 
function amountUpdate(amount) {
    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode('Tổng tiền: $ ' + Intl.NumberFormat().format(amount))
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}

// Tạo button đơn hàng
let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Đặt hàng')
buttonTag.onclick = function () {
    console.log("clicked")
}

// Gọi API để lấy danh sách sản phẩm
let totalAmount = 0;

fetch('https://65f02c4bda8c6584131afec1.mockapi.io/api/v1/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('call successful');
        contentTitle = data;

        let counter = Number(document.cookie.split(',')[1].split('=')[1])
        document.getElementById("totalItem").innerHTML = ('Tổng sản phẩm: ' + counter)

        let item = document.cookie.split(',')[0].split('=')[1].split(" ")
        console.log(counter)
        console.log(item)

        let i;
        for (i = 0; i < counter; i++) {
            let itemCounter = 1
            for (let j = i + 1; j < counter; j++) {
                if (Number(item[j]) == Number(item[i])) {
                    itemCounter += 1;
                }
            }
            totalAmount += Number(contentTitle[item[i] - 1].price) * itemCounter
            dynamicCartSection(contentTitle[item[i] - 1], itemCounter)
            i += (itemCounter - 1)
        }
        amountUpdate(totalAmount)
    })
    .catch(error => {
        console.error('Error:', error);
    });
