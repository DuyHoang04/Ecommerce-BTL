let containerProduct = document.getElementById("containerProductClothing");


let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
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

        for (let i = 0; i < contentTitle.length; i++) {
            if (!contentTitle[i].isAccessory) {
                containerProduct.appendChild(dynamicClothingSection(contentTitle[i]));
            }
        }
        console.log("Success");
    })
    .catch(error => {
        console.error("Error:", error);
    });

// function tạo sản phẩm
function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");

    boxLink.href = "/contentDetails.html?" + ob.id;

    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.name);
    h3.appendChild(h3Text);

    // let h4 = document.createElement("h4");
    // let h4Text = document.createTextNode(ob.brand);
    // h4.appendChild(h4Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("$  " + Intl.NumberFormat().format(ob.price));
    h2.appendChild(h2Text);

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    // detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
}
