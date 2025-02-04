
//genereate a order number in the confirmation page
function generateOrderNumber () {
    const prefix = "FED";
    const randomNumber = Math.floor(Math.random() * 100000);
    const orderNumber = `${prefix}${randomNumber}`;
    return orderNumber; 
}

document.addEventListener("DOMContentLoaded", function() {
    const orderNumber = generateOrderNumber();
    const orderNumberElement = document.getElementById("order-number");

    if (orderNumberElement) {
        orderNumberElement.textContent = `Your order number is: ${orderNumber}`;
    } else {
        console.error ("Order number not found!");
    }
});