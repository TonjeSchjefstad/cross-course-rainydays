
//progress bar
function updateProgressBar (step) {
    const progressSteps = document.querySelectorAll(".progress-step");
    const progress = document.getElementById("progress");

    progressSteps.forEach((stepElement, index) => {
        if (index < step) {
            stepElement.classList.add("progress-step-active");
        } else {
            stepElement.classList.remove("progress-step-active");
        }
    });

    const stepPercentage = ((step - 1) / (progressSteps.length - 1)) * 100;
    progress.style.width = `${stepPercentage}%`;
}

if (document.title.toLowerCase().includes("cart")) {
    updateProgressBar(1);
}

if (document.title.toLowerCase().includes("checkout")) {
    updateProgressBar(2);
}

if (document.title.toLowerCase().includes("confirmation")) {
    updateProgressBar(3);
}

//Cart
function displayCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p> Your cart is empty</p>";
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;

    cart.forEach ((product, index) => {
        const itemTotal = product.price;
        totalPrice += itemTotal; 

        cartHTML += `
            <div class="cart-item">
                <img src="${product.image.url}" alt="${product.image.alt}">
                <h3>${product.title}</h3>
                <p>Size: ${product.size}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
    });
    
    cartHTML +=`
        <div class="cart-summary">
            <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
            <a href="checkout.html" class="proceed-checkout">Proceed to Checkout </a>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;

    document.querySelectorAll (".remove-item").forEach(button => {
        button.addEventListener("click", removeItemFromCart);
    });
}


function removeItemFromCart(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart"))||[];

    cart.splice(index, 1);

    localStorage.setItem ("cart", JSON.stringify(cart));
    displayCart ();
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});


