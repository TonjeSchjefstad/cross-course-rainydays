
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


//Checkout 
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




//Terms and conditions
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
