// Đặt cookie orderId và counter về 0 khi tải trang
document.cookie = "orderId=0; counter=0";

fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/order")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonArray => {
        console.log(jsonArray);

        jsonArray.push({
            "id": jsonArray.length + 1,
            "amount": 200,
            "product": ["userOrder"]
        });

        // Gửi yêu cầu POST để cập nhật JSON mới
        fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonArray)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log("Data updated successfully!");
            })
            .catch(error => {
                console.error("Error updating:", error);
            });
    })
    .catch(error => {
        console.error("Error:", error);
    });
