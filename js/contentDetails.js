console.clear();
var similarProduct = document.getElementById("similarProduct")
// Lấy ID từ query string trong URL
let id = location.search.split('?')[1];
console.log(id);
let contentTitle;

// Kiểm tra cookie để hiển thị số lượng sản phẩm trong giỏ hàng
if (document.cookie.indexOf(",counter=") >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    let h1Text = document.createTextNode(ob.name);
    h1.appendChild(h1Text);

    let h4 = document.createElement('h4');
    let h4Text = document.createTextNode(ob.brand);
    h4.appendChild(h4Text);

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    let h3DetailsText = document.createTextNode('$ ' + Intl.NumberFormat().format(ob.price));
    h3DetailsDiv.appendChild(h3DetailsText);

    let h3 = document.createElement('h3');
    let h3Text = document.createTextNode('Mô tả');
    h3.appendChild(h3Text);

    let para = document.createElement('p');
    let paraText = document.createTextNode(ob.description);
    para.appendChild(paraText);

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    let h3ProductPreviewText = document.createTextNode('Xem trước');
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    for (let i = 0; i < ob.photos.length; i++) {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = ob.photos[i];
        imgTagProductPreviewDiv.onclick = function () {
            console.log("clicked" + this.src);
            imgTag.src = this.src;
            document.getElementById("imgDetails").src = this.src;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    }

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.classList.add("btn-order")
    buttonDiv.appendChild(buttonTag);

    buttonText = document.createTextNode('Thêm vào giỏ hàng');
    buttonTag.onclick = function () {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        toast({
            title: "Thành công!",
            message: "Thêm vào giỏ hàng thành công",
            type: "success",
            duration: 2000
        });
        console.log(document.cookie);
    };
    buttonTag.appendChild(buttonText);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    return mainContainer;
}

const dynamicProductSection = (ob) => {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");

    boxLink.href = "/contentDetails.html?" + ob.id;

    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "detailsProduct";

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.name);
    h3.classList.add("name")
    h3.appendChild(h3Text);

    // let h4 = document.createElement("h4");
    // let h4Text = document.createTextNode(ob.brand);
    // h4.appendChild(h4Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("$  " + Intl.NumberFormat().format(ob.price));
    h2.classList.add("price")
    h2.appendChild(h2Text);

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    // detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
}

const callSimilarProduct = (isAccessory) => {
    fetch("https://65f02c4bda8c6584131afec1.mockapi.io/api/v1/products")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("call successful");
            contentTitle = data;

            // Kiểm tra cookie để hiển thị số lượng sản phẩm
            if (document.cookie.indexOf(",counter=") >= 0) {
                var counter = document.cookie.split(",")[1].split("=")[1];
                document.getElementById("badge").innerHTML = counter;
            }
            let productCount = 0;
            contentTitle = contentTitle.filter(x => x.id !== id);

            for (let i = 0; i < contentTitle.length; i++) {
                if (contentTitle[i].isAccessory === isAccessory && productCount < 4) {
                    similarProduct.appendChild(dynamicProductSection(contentTitle[i]));
                    productCount++;
                }
                console.log("Success");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

fetch('https://65f02c4bda8c6584131afec1.mockapi.io/api/v1/products/' + id)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const isAccesstory = data?.isAccessory;
        console.log(isAccesstory);
        console.log('call successful');
        dynamicContentDetails(data);
        callSimilarProduct(isAccesstory)
    })
    .catch(error => {
        console.error('Error:', error);
    });
