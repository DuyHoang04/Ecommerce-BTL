const containerProduct = document.getElementById("containerProductAccessories");
let contentTitle;

function createProductBox(product) {
    const boxDiv = document.createElement("div");
    boxDiv.id = "box";

    const boxLink = document.createElement("a");
    boxLink.href = "/contentDetails.html?" + product.id;

    const imgTag = document.createElement("img");
    imgTag.src = product.preview;

    const detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    // const h4 = document.createElement("h4");
    // h4.textContent = product.brand;

    const h2 = document.createElement("h2");
    h2.textContent = "$ " + product.price;

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    //detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
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

        if (document.cookie.includes(",counter=")) {
            const counter = document.cookie.split(",")[1].split("=")[1];
            document.getElementById("badge").innerHTML = counter;
        }

        for (let i = 0; i < contentTitle.length; i++) {
            if (contentTitle[i].isAccessory) {
                containerProduct.appendChild(createProductBox(contentTitle[i]));
            }
        }
        console.log("Success");
    })
    .catch(error => {
        console.error("Call failed!", error);
    });

