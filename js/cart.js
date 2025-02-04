
//progress bar at the top of the cart-checkout-confirmartion

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


// Items in cart 
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

//Remove from cart button
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


// Summarty in checkout
function displayCheckout () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkout-container")

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p> Your cart is empty. Please add items to your cart before proceeding.</p>";
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;

    cart.forEach ((item) => {
        totalPrice += item.price; 
        cartHTML += `
            <div class="checkout-item">
                <div class="checkout-item-img-wrapper">
                    <img src="${item.image.url}" alt="${item.image.alt}">
                </div>
                <div class="checkout-item-details">
                    <h3>${item.title}</h3>
                    <div class="checkout-item-size-price">
                        <p class="size">Size: ${item.size}</p>
                        <p class="price">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
    }) ;
    
    cartHTML +=`
        <div class="checkout-summary">
            <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
        </div>
    `;

    checkoutContainer.innerHTML = cartHTML;
    }
document.addEventListener("DOMContentLoaded", displayCheckout)


//Terms and conditions modals in checkout page
document.addEventListener("DOMContentLoaded", function () {

    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const closeTerms = document.querySelector('.close-terms');
    const closePrivacy = document.querySelector('.close-privacy');
    const acceptTermsCheckboxes = document.getElementById('accept-terms');
    const submitButton = document.querySelector('button[type="submit"]');

    termsLink.onclick = function (event) {
        event.preventDefault();
        termsModal.style.display = 'block';
    }

    privacyLink.onclick = function (event) {
        event.preventDefault();
        privacyModal.style.display = 'block';
    }

    closeTerms.onclick = function () {
        termsModal.style.display = 'none';
    }

    closePrivacy.onclick = function () {    
        privacyModal.style.display = 'none';
    }      

    window.onclick = function (event) {
        if (event.target == termsModal) {
            termsModal.style.display = 'none';
        }
        if (event.target == privacyModal) {
            privacyModal.style.display = 'none';
        }
    }       

    acceptTermsCheckboxes.addEventListener('change', function () {
        submitButton.disabled = !acceptTermsCheckboxes.checked;
    });

});

document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault ();

    window.location.href = "confirmation.html";
});

//genereate a order number in the confirmation page
function generateOrderNumber () {
    const prefix = "FED";
    const randomNumber = Math.floor(Math.random() * 100000);
    const orderNumber = `${prefix}${randomNumber}`;
    return orderNumber; 
}

document.addEventListener("DOMContentLoaded", function() {
    const orderNumber = generateOrderNumber();
    const orderNumberElement = document.querySelector(".checkout p b");
    orderNumberElement.textContent = `Your order number is: ${orderNumber}`;

});